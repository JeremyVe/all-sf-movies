This web app gives an easy and visual way to showcase the locations of movies scenes filmed in San Fransisco,
using open data from 'https://data.sfgov.org/resource/wwmu-gmzc.json'.


General Architecture :
 - Express Back-end
 - React Front-end
 - MongoDb as persistent database


It was the first time using those three technologies (except some reading about React and it's architecture).



The trickiest part of this application, for me, is that the movies data is quite rough :
  - vague human readable addresses
  - addresses sometime missing
  - need for geocoding

For scalability and efficiency, I chose to geocode addresses once when adding new movies,
and saving it in our database, avoiding repeated needs to fetch Google Geocode Api for each and every request.

And to complement this approach, because of the rate limit on Google Geocode Api,
I have made a service ('/tasks/create_seed_data.js') that will fetch the movies data, geocode addresses,
and write to a .json file, for simple future seed of the database.

Movies and Locations are two separate collections, with a reference to a movie in each location.
There is no main design decision behind, i was practicing, I believe having a simple Movie collection with addresses embedded would actually be more clean and suitable at this state of the application.






TODOS :

Some things that I would do given more time :

- For simplicity, I used an array to contain movies waiting for geocoding. We could use a job queue and background worker

As i said, it was a first time to use express and mongoDb, and one thing that I would like to improve and dig deeper, is the "looping and async actions" part.
In a synchronous way, we would just loop through our data, check if a movie exist, if yes, save only the location, otherwise save the movie the location.
With Node and Mongo, I have use recursion to deal with this situation, but I believe there should be cleaner way (using async/await or generator?).
Just to note that having only a movie collection, with embedded locations, we could use {upsert: true} on an update query to create or update records.
