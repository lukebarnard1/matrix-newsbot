Matrix News Bot
===============

This bot will be a simple matrix client (not application service) that will post `x.news` events into a given matrix room. For now, the events will be fake news, but in theory this could be extended to draw on external news sources from RSS feeds or elsewhere.

# Event Structure

```json
{
	title: "The Title of The News Story",
	body: "The body of the news story, including *markdown* if desired",
	local: true
}
```
 - `title`: The title of the news story.
 - `body`: The body of the news story.
 - `local`: Whether the news story is local. If it is not local, then it is considered global.

# Why?

This is part of a hack for THE Port 2017 hackathon where team Pier X5 is developing a communication system for use in refugee camps where Internet may not be available but where collaboration is essential.

This bot will send events into a room for the live demo!
