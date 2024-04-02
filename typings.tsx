export type Listing = {
  url: string;
  title: string;
  rating: string | null; // cipars
  description: string;
  price: string;
  link: string;

  booking_metadata: string;
  rating_word: string; // etc good or what ever
  rating_count: string | null; // reviews
}

export type Result = {
  content: {
    listings: Listing [];
    total_listings: string;
  }
}
