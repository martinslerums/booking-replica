import { searchParams } from "@/app/search/page";
import { Listing, Result } from "@/typings";
import { Browser } from "puppeteer";
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchResults = async (searchParams: searchParams) => {
  const url = new URL(searchParams.url);

  console.log("scraping url: ", url.href);

  const browser: Browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto(url.href);
  
  await wait(1000);

  const listings = await page.evaluate(() => {
    const listingPods = Array.from(document.querySelectorAll('[data-testid="property-card-container"]'));
    
    const data = listingPods.map((listing:any) => ({
      title: listing.querySelector('div[data-testid="title"]')?.innerText || "Title not found",
      location: listing.querySelector('span[data-testid="address"]')?.innerText || "Location not found",
      rating_word: listing.querySelector('.a3b8729ab1.e6208ee469.cb2cbb3ccb')?.innerText || "Rating_word not found",
      rating_count: listing.querySelector('.abf093bdfe.f45d8e4c32.d935416c47')?.innerText || "Rating_count not found",
      link: listing.querySelector('.a78ca197d0')?.getAttribute('href') || "Link not found",
      url: listing.querySelector('img')?.getAttribute('src') || "Image URL not found", 
      rating: listing.querySelector('.a3b8729ab1.d86cee9b25')?.innerText.split(' ')[1] || "N/A",
      booking_metadata: listing.querySelector('.c5ca594cb1.f19ed67e4b .abf093bdfe.f45d8e4c32')?.innerText || "Booking metadata not found",
      price: listing.querySelector('div.abf093bdfe.f45d8e4c32 span.f6431b446c.fbfd7c1165.e84eb96b1f')?.innerText || "Price not found",
      total_listings: listing.getElementsByTagName('h1')?.innerText || "Tatal listing count not found",

     
      
    }));
    return data;
  });
  console.log("Listings: ", listings);

  await browser.close();
  return listings
};
