# Let's make your favorite podcasts searchable

;TLDR: check out a [demo](https://searchpodcast.vercel.app/) I did for [My First Million](https://www.youtube.com/@MyFirstMillionPod/videos)

## How to adapt this to your favorite podcast

Now, this whole flow is all over the place tbh. I hope I can summarize this in a digestable way

## Prereqs

```
git clone
cd podcastsearch && git submodule init && git submodule update
```

Then get [Chroma](https://docs.trychroma.com/deployment#simple-aws-deployment) up and running

### Navigating the repo:

- **app**: Nextjs based frontend
- **transcriber**: Wrapper around [wordcab-transcribe](https://github.com/Wordcab/wordcab-transcribe) to take care of audio -> text
- **main.ipynb**: this glues individual pieces together by extracting audio from youtube videos, extracting transcriptions and storing them within Chroma. Load this into Google Colab and mount your Google Drive
