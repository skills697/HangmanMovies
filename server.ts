import express, {Express, Request, Response } from 'express';
import { getMovieTitles, scrapeAndStore } from './imdbfetch';

const app: Express = express();

app.get('/api/movie-title', (req: Request, res: Response) => {
    getMovieTitles()
    .then((titles) => {
        if(titles.length > 0)
        {
            const tres = titles[Math.floor(Math.random() * titles.length)];
            console.log("Movie Selected: " + tres);
            res.status(200).send(tres);
        } 
        else
        {
            scrapeAndStore()
            .then(() => {
                getMovieTitles()
                .then((newTitles) => {
                    if(newTitles.length > 0)
                    {
                        const ires = newTitles[Math.floor(Math.random() * newTitles.length)];
                        console.log("Movie Selected: " + ires);
                        res.status(200).send(ires);
                    } 
                })
                .catch((error) => {
                    res.status(500).send("Error during new movie title selection.");
                    console.error(error);
                })
            })
            .catch((error) => {
                res.status(500).send("Error during imdb fetch.");
                console.error(error);
            });
        }
    })
    .catch((error) => {
        res.status(500).send("Error during movie title selection.");
        console.error(error);
    });
});

app.use(express.static('dist/first-angular'));

app.get('*', (req: Request, res: Response) => {
    res.sendFile('./dist/first-angular/index.html');
});

const PORT = 4200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});