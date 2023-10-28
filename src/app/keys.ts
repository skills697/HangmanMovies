export interface Key {
  id: string;
  pressed: boolean;
}

export type KeyPress = { id: string }

export const KeyboardKeys: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];