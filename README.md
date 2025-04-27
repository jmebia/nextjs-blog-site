# nextjs-blog-site

I will be using this for my personal website.

## Getting Started

Run the following commands to get the projeect running:

```bash

# start docker
docker-compose up -d

# install dependencies
npm install

# setup the database using prisma
npx prisma generate
npx prisma db push

# then run the dev server
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
