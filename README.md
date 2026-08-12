# The Alterations Club — Website Prototype

A lightweight static prototype for an Alcoholics Anonymous clubhouse website. The design focuses on legitimacy, clarity, accessibility, meeting discovery, directions, events, and trusted recovery resources.

## Demo goals

- Make today's meetings immediately visible.
- Keep navigation simple for a non-technical audience.
- Make directions, parking, and entrance details unusually clear.
- Separate events at the club from events elsewhere in the fellowship.
- Use a restrained, community-oriented visual style instead of generic recovery imagery.
- Provide prominent links to A.A. and related resources.
- Work well on older/smaller phones.

## Run locally

No build step is required.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

You can also open `index.html` directly in a browser.

## Structure

- `index.html` — page structure/content
- `styles.css` — responsive layout and visual design
- `script.js` — demo meeting data and day filtering

## Next steps

This prototype intentionally uses placeholder contact information, address details, event data, and meeting schedules. Before publishing, replace all placeholders with verified club information and confirm the exact organizational/disclaimer language to use in the footer.

## Editing site information

Routine site information lives in **`site-data.js`**. This is the first file to edit when the club's information changes.

For example, the address is defined once:

```js
address: {
  street: "123 Example Street",
  city: "San Antonio",
  state: "TX",
  postalCode: "78xxx"
}
```

Changing those four values automatically updates every displayed club address as well as the Google Maps and Apple Maps links.

The same applies to the phone number, email address, entrance information, parking information, accessibility note, club name/tagline, and meeting schedule.

### Files

- `site-data.js` — **routine editable content and meeting data**
- `index.html` — page structure; normally does not need editing for routine information changes
- `styles.css` — visual design and responsive layout
- `script.js` — rendering/binding logic; normally does not need editing for routine information changes
