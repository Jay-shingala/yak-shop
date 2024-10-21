# YakShop

YakShop is a Node.js application that helps a Yak shepherd manage their herd's stock (milk and skins). It provides RESTful endpoints to query the herd status and stock levels after a given number of days.

## Features
- Query the total milk produced and skins available for sale after a specified number of days.
- View the current status of the yak herd after a specified number of days, including their ages and the last day they were shaved.


## API Endpoints
- GET /yak-shop/stock/:T
- GET /yak-shop/herd/:T

## Requirements
- Node.js (version 12 or higher)
- npm (Node package manager)

## Getting Started
- npm install
- node yakShop.js herd.json
