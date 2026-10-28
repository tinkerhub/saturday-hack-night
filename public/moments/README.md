# Moments photo assets

Drop event photos here, then list their paths in the `moments` array in
`lib/data.ts`, e.g.:

```ts
export const moments: string[] = [
  "/saturday-hack-night/moments/photo-01.jpg",
  "/saturday-hack-night/moments/photo-02.jpg",
];
```

No other code needs to change — both the homepage "Moments" section and the
`/moments` page render directly from this array, and any remaining empty
slots automatically show as placeholders.
