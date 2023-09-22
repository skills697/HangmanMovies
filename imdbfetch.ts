import { chromium, Page } from 'playwright';
import { throwError } from 'rxjs';
import sqlite3 from 'sqlite3';

type MovieRow = {
  title: string;
};

export async function getMovieTitles(): Promise<string[]>{
  const dateCurr = getDateValue();
  let res: string[] = [];
  
  const db = new sqlite3.Database('movies.db');
  try {
    await runSQLiteQuery(db, 'CREATE TABLE IF NOT EXISTS movie_titles (dte_checked INT, num_top INT, title TEXT)');
    
    const rows: MovieRow[] = await allSQLite(
      db, 
      "SELECT title FROM movie_titles WHERE dte_checked = $today ORDER BY num_top ASC", 
      {
        $today: dateCurr
      });
    
    res = rows.map(row => row.title);
  } catch (err) {
    console.error("DB Select Error: ", err);
  } finally {
    db.close();
  };
  
  return res;
}

/**
 * Scrapes top 250 movie titles from IMDB
 */
export async function scrapeAndStore(): Promise<void> {
  // Initialize Playwright browser and page
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await doLoadPage(page);
  page.on('console', (msg) => {
    const msgtext = msg.text();
    if(msgtext.indexOf("tg=") > -1 || msgtext.indexOf("nf=") > -1){
      console.log(msgtext);
    }
  })

  const titles = await page.evaluate<string[]>(() => {
    let stout: string[] = [];
    const groupItems = document.querySelectorAll<HTMLElement>("a.ipc-title-link-wrapper > h3");
    for(let i=0; i < groupItems.length; i++){
      const titleRegex = /^[0-9]+\. (.*)$/g;
      const tg = groupItems[i].innerText;
      const matching = titleRegex.exec(tg);
      if(matching && matching.length > 1)
      {
        stout.push(matching[1]);
        console.log("tg= |" + tg + "|");
      }
      else
      {
        console.log("nf= |" + tg + "|");
      }
    }
    return stout;
  });
  
  if(titles.length <= 0){
    throw new Error("Movie Titles Not Found");
  }

  await browser.close();
  console.log("IMDB Scraping Found: " + titles.length);

  await storeMovies(titles);
}

/**
 * Store the records into a SQLite database table
 */
async function storeMovies(movies: string[]){
  const dateCurr = getDateValue();
  const db = new sqlite3.Database('movies.db');
  try {

    await runSQLiteQuery(db,'DELETE FROM movie_titles');

    for(let i=0; i < movies.length; i++){
      await insertMovieTitle(db, dateCurr, i + 1, movies[i]);
    }

    console.log('All ' + movies.length + ' movies have been stored.');
  } catch (err) {
   console.error("DB Insert Err: ", err);
  } finally {
    db.close();
  };
}

function doSleep(timeSleep: number) {
  console.log("Sleeping for " + timeSleep + " seconds");
  return new Promise((resolve)=>{ setTimeout(resolve, timeSleep) });
}

function getDateValue(): number{
  const date = new Date();
  let res = date.getFullYear() * 10000;
  res += (date.getMonth() + 1) * 100;
  res += date.getDate();
  return res;
}

async function doLoadPage(page: Page){
  await page.goto('https://www.imdb.com/chart/top/', { waitUntil: 'domcontentloaded'});

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  
  await doSleep(600);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await doSleep(600);
}

function runSQLiteQuery(db: sqlite3.Database, query: string, params?: any): Promise<void> {
  return new Promise((resolve, reject) => {
      db.run(query, params, function(err) {
          if (err) reject(err);
          else resolve();
      });
  });
}

function allSQLite(db: sqlite3.Database, query: string, params?: any): Promise<any[]> {
  return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
      });
  });
}

function insertMovieTitle(db: sqlite3.Database, dte_checked: number, num_top: number, title: string): Promise<void> {
  return new Promise((resolve, reject) => {
      const query = 'INSERT INTO movie_titles (dte_checked, num_top, title) VALUES (?, ?, ?)';
      db.run(query, [dte_checked, num_top, title], function(err) {
          if (err) reject(err);
          else resolve();
      });
  });
}

