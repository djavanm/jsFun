const { kitties } = require('./datasets/kitties');
const { clubs } = require('./datasets/clubs');
const { mods } = require('./datasets/mods');
const { cakes } = require('./datasets/cakes');
const { classrooms } = require('./datasets/classrooms');
const { breweries } = require('./datasets/breweries');
const { instructors, cohorts } = require('./datasets/turing');
const { bosses, sidekicks } = require('./datasets/bosses');
const { constellations, stars } = require('./datasets/astronomy');
const { weapons, characters } = require('./datasets/ultima');
const { dinosaurs, humans, movies } = require('./datasets/dinosaurs');






// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangeKittyNames() {
    
    // Return an array of just the names of kitties who are orange e.g.
    // ['Tiger', 'Snickers']
    const result = kitties.filter(kitty => kitty.color === 'orange').map(kitty => kitty.name);
    return result;

    // Annotation:
    // I used filter to create a array of kitties that are orange, and then mapped that new array in order to return an array of their
    // name values. 
  },

  sortByAge() {
    // Sort the kitties by their age

    const result = kitties.sort((a, b) => (b.age - a.age));
    return result;

    // Annotation:
    // I used the sort method to return the kittens sorted from oldest to  youngest. 
  },

  growUp() {
    // Return an array of kitties who have all grown up by 2 years e.g.
    // [{
    //   name: 'Felicia',
    //   age: 4,
    //   color: 'grey'
    // },
    // {
    //   name: 'Tiger',
    //   age: 7,
    //   color: 'orange'
    // },
    // ...etc]

    const result = kitties;
    result.forEach(kitty => kitty.age += 2);
    return result;
    // Annotation:
    // I binded the result to the kitties array, then I used the forEach method to 
    // got through every element in the result array, and assigned the age value to be 
    // two years higher than itself. I then returned the new array.
  }
};







// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {
    // Create an object whose keys are the names of people, and whose values are
    // arrays that include the names of the clubs that person is a part of. e.g. 
    // {
    //   Louisa: ['Drama', 'Art'],
    //   Pam: ['Drama', 'Art', 'Chess'],
    //   ...etc
    // }

    const result = clubs.reduce((acc, club) => {
      club.members.forEach(member => {
        if(!acc[member]) {
          acc[member] = [];
        } 
        acc[member].push(club.club);
      });
      return acc;
    }, {});
    return result;
    // Annotation:
    // I used reduce to create an array of clubs that each person was 
    // in by checking to see if the member name wasn't already created, if not, then 
    // we would create a new one as an empty array. From there, we would push
    // each club.club string into each person's array. 
  }
};




// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: mods from ./datasets/mods
const modPrompts = {
  studentsPerMod() {
    // Return an array of objects where the keys are mod (the number of the module)
    // and studentsPerInstructor (how many students per instructor there are for that mod) e.g.
    // [
    //   { mod: 1, studentsPerInstructor: 9 },
    //   { mod: 2, studentsPerInstructor: 11 },
    //   { mod: 3, studentsPerInstructor: 10 },
    //   { mod: 4, studentsPerInstructor: 8 }
    // ]

    // const result = [];
    // mods.forEach((mod,index) =>{
    //   const sPI = mod.students / mod.instructors;
    //   result.push({'mod': index+1, 'studentsPerInstructor': sPI});
    // });
    const result  = mods.reduce((modRatios, mod) => {
      modRatios.push({'mod': mod.mod, 
        'studentsPerInstructor': mod.students / mod.instructors});
      return modRatios;
    }, []);
    return result;

    // Annotation:
    // I declared result as an empty array, and then used forEach
    // to push an object literal into the result array.

    // Refactored: I 
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  stockPerCake() {
    // Return an array of objects that include just the flavor of the cake and how
    // much of that cake is in stock e.g.
    // [ 
    //    { flavor: 'dark chocolate', inStock: 15 },
    //    { flavor: 'yellow', inStock: 14 },
    //    ..etc
    // ]

    // const result = [];
    // cakes.forEach(cake => {
    //   result.push({'flavor': cake.cakeFlavor, 'inStock': cake.inStock});
    // });
    const result = cakes.reduce((cakesStock, cake) => {
      cakesStock.push({'flavor': cake.cakeFlavor,
        'inStock': cake.inStock
      });
      return cakesStock;
    }, []);
    return result;

    // Annotation:
    // I used the reduce method to create an empty array that I then pushed an 
    // object literal that contained  the flavor and inStock information. 
  },

  onlyInStock() {
    // Return an array of only the cakes that are in stock
    // e.g.
    // [
    //   {
    //   cakeFlavor: 'dark chocolate',
    //   filling: null,
    //   frosting: 'dark chocolate ganache',
    //   toppings: ['dutch process cocoa', 'toasted sugar', 'smoked sea salt'],
    //   inStock: 15
    // },
    // {
    //   cakeFlavor: 'yellow',
    //   filling: 'citrus glaze',
    //   frosting: 'chantilly cream',
    //   toppings: ['berries', 'edible flowers'],
    //   inStock: 14
    // },
    // ..etc
    // ]

    const result = cakes.filter(cake => cake.inStock > 0);
    return result;

    // Annotation:
    // I used array.filter to return all the cake objects who's inStock value was greater than 0. 
  },
  
  totalInventory() {
    // Return the total amount of cakes in stock e.g.
    // 59

    const result = cakes.reduce((acc, cake) => {
      return acc += cake.inStock;
    }, 0);
    return result;

    // Annotation:
    // I used the reduce method to count all of the cakes inStock values. 
  },

  allToppings() {
    // Return an array of all unique toppings (no duplicates) needed to bake
    // every cake in the dataset e.g.
    // ['dutch process cocoa', 'toasted sugar', 'smoked sea salt', 'berries', ..etc]

    // const result = cakes.map(cake => cake.toppings).reduce((acc, toppings) => {
    //   toppings.forEach(topping => acc.push(topping));
    //   return acc;
    // }, []);
    // return [...new Set(result)];
    // Annotation:
    // I mapped through each cake object, and created an array of their toppings arrays. I then reduced each toppings array into one large
    // array of toppings, and returned a new Set of toppings that were all unique. 

    const result = cakes.map(cake => cake.toppings)
      .reduce((acc, toppings) => {
        toppings.forEach(topping => {
          if(!acc.includes(topping)) {
            acc.push(topping);
          }
        });
        return acc;
      }, []);
    return result;
  },

  groceryList() {
    // I need to make a grocery list. Please give me an object where the keys are
    // each topping, and the values are the amount of that topping I need to buy e.g.
    // { 
    //    'dutch process cocoa': 1,
    //    'toasted sugar': 3,
    //    'smoked sea salt': 3,
    //    'berries': 2, 
    //    ...etc
    // }

    const result = cakes.reduce((acc, cake) => {
      cake.toppings.forEach(topping => {
        if(!acc[topping]) {
          acc[topping] = 0;
        }
        acc[topping]++;
      });
      return acc;
    }, {});
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    // Create an array of just the front-end classrooms. e.g.
    // [
    //   { roomLetter: 'A', program: 'FE', capacity: 32 },
    //   { roomLetter: 'C', program: 'FE', capacity: 27 },
    //   { roomLetter: 'E', program: 'FE', capacity: 22 },
    //   { roomLetter: 'G', program: 'FE', capacity: 29 }
    // ]

    const result = classrooms.filter(classroom => classroom.program === 'FE');
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  totalCapacities() {
    // Create an object where the keys are 'feCapacity' and 'beCapacity',
    // and the values are the total capacity for all classrooms in each program e.g.
    // { 
    //   feCapacity: 110,
    //   beCapacity: 96
    // }

    const result = classrooms.reduce((acc, classroom) => {
      if(!acc.beCapacity) {
        acc.beCapacity = 0;
      }
      if(!acc.feCapacity) {
        acc.feCapacity = 0;
      }
      if(classroom.program === 'FE') {
        acc.feCapacity += classroom.capacity;
      } 
      if(classroom.program === 'BE') {
        acc.beCapacity += classroom.capacity;
      }
      return acc;
    }, {});
    return result;

    // Annotation:
    // I created a reduce method to check for key of .beCapacity && .beCapacity.
    // Next, I checked eached classrooms program, to determine if we would accumulate 
    // the classroom capacity. I then returned the final object.
  },

  sortByCapacity() {
    // Return the array of classrooms sorted by their capacity (least capacity to greatest)

    const result = classrooms.sort((a, b) => a.capacity - b.capacity);
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    // Return the total beer count of all beers for every brewery e.g.
    // 40

    const result = breweries.reduce((acc, brewery) => {
      return acc += brewery.beers.length;
    }, 0);
    return result;

    // Annotation:
    // I used reduce to grab the length of each beers array within each brewery.
  },

  getBreweryBeerCount() {
    // Return an array of objects where each object has the name of a brewery
    // and the count of the beers that brewery has e.g.
    // [
    //  { name: 'Little Machine Brew', beerCount: 12 },
    //  { name: 'Ratio Beerworks', beerCount: 5},
    // ...etc.
    // ]

    const result = breweries.reduce((acc, brewery) => {
      acc.push({'name': brewery.name, 
        'beerCount': brewery.beers.length
      });
      return acc;
    }, []);
    return result;

    // Annotation:
    // I used the array reduce method to create an array, and used .push() to 
    // print an object literal for each brewery within the array.
  },

  findHighestAbvBeer() {
    // Return the beer which has the highest ABV of all beers
    // e.g.
    // { name: 'Barrel Aged Nature\'s Sweater', type: 'Barley Wine', abv: 10.9, ibu: 40 }

    const result = breweries.reduce((acc, brewery) => {
      if(!acc.abv) {
        acc.abv = 0;
      }
      brewery.beers.forEach(beer => {
        acc = beer.abv > acc.abv ? beer : acc;
      });
      return acc;
    }, {});
    return result;

    // Annotation:
    // I used reduce to create an empty object, I then assigned 
    // a .abv value of 0, and used the for each method to check every 
    // beer element within the beers array and find the highest abv content.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module. e.g. 
    // [
    //  { name: 'Pam', studentCount: 21 },
    //  { name: 'Robbie', studentCount: 18 }
    // ]

    const result = instructors.reduce((acc, instructor) => {
      cohorts.forEach(cohort => {
        if(instructor.module === cohort.module) {
          acc.push({'name': instructor.name, 'studentCount': cohort.studentCount});
        }
      });
      return acc;
    }, []);
    return result;

    // Annotation:
    // I reduced the isnstructors method, and called a forEach that examined each cohort
    // within the cohorts array. I think compared the instructor's module
    // to the cohorts module, and pushed an object literal containing 
    // the instructors name and their  studentCount. 
  },

  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.
    // { 
    // cohort1806: 9,
    // cohort1804: 10.5
    // }

    const result = cohorts.reduce((acc, cohort) => {
      let current = `cohort${cohort.cohort}`;
      if(!acc[current]) { 
        acc[current] = 0;
      }
      acc[current] = cohort.studentCount / (instructors.filter(instructor => (instructor.module === cohort.module)).length);
      return acc;
    }, {});
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [2, 4],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }

    const result = instructors.reduce((acc, instructor, index) => {
      if(!acc[instructor.name]) {
        acc[instructor.name] = [];
      }
      instructor.teaches.forEach(skill => {
        cohorts.forEach(cohort => {
          if(cohort.curriculum.includes(skill) && !acc[instructor.name].includes(cohort.module)) {
            acc[instructor.name].push(cohort.module);
            acc[instructor.name].sort();
          }
        });
      });
      return acc;
    }, {});
    return result;

    // Annotation:
    // I used reduce on the instructors array to create an empty object. I check iterated through 
    // each teacher to use their name as a key, with an empty array as their value. I then used the foreach method
    // to take each of their skills, and check every cohort to see if their skill was in each cohort's curriculum array.
    // I then pushed the  cohort's module so long as it wasn't already there, and sorted that resulting array. 
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // { 
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    const result = cohorts.reduce((acc, cohort) => {
      cohort.curriculum.forEach(topic => {
        if(!acc[topic]) {
          acc[topic] = [];
        }
        instructors.forEach(instructor => {
          if(instructor.teaches.includes(topic) && !acc[topic].includes(instructor.name)) {
            acc[topic].push(instructor.name);
          }
        });
      });
      return acc;
    }, {});
    return result;

    // Annotation:
    // I firt created a topic for the current subject, then iterated through the instructors array and 
    // set up a boolean to check whether the topic was included in the current instructor's list of skills. 
    
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]

    const result = Object.values(bosses).reduce((accArr, boss) => {
      let currentBoss = boss.name;
      accArr.push(sidekicks.reduce((acc, sidekick) => {
        if(!acc['bossName']) {
          acc['bossName'] = currentBoss;
          acc['sidekickLoyalty'] = 0;
        } 
        if(currentBoss === sidekick.boss) {
          acc['sidekickLoyalty'] += sidekick.loyaltyToBoss;
        }
        return acc;
      }, {}));
      return accArr;
    }, []);
    return result;

    // Annotation:
    // We first had to create an array out of the bosses dataset. I accomplished this by passes the dataset through an Object.values
    // prototype. From there, we used reduce to create our empty array that would be passed back. Next, we declared the 
    // currentBoss variable to help us distinguish the values needed when reducing the nested sidekicks array. I then used the array.push
    // method to push in each object that met the proper conditions when iterating through the sidekicks array. 
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [ 
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]

    const result = stars.reduce((acc, star) => {
      if(Object.values(constellations).reduce((acc, constellation) => {
        acc = acc.concat(constellation.stars);
        return acc;
      }, []).includes(star.name)) {
        acc.push(star);
      }
      return acc;
    }, []);
    return result;

    // Annotation:
    // I created an array of constellations from the constellations object, then used .includes method
    // to see if each star was contained in that array. 
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    const result = stars.reduce((acc, star) => {
      if(!acc[star.color]) {
        acc[star.color] = [];
      }
      if(!acc[star.color].includes(star)) {
        acc[star.color].push(star);
      }
      return acc;
    }, {});
    return result;

    // Annotation:
    // I used the reduce method to create a single object,
    // then created a key for every star color, and pushed 
    // the star object into any array that matched that criteria.
  },

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.
    
    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra", 
    //    "Canis Minor", 
    //    "The Plow", 
    //    "Orion", 
    //    "The Little Dipper" ]

    const result = stars.sort((a, b) => a.visualMagnitude - b.visualMagnitude).reduce((acc, star) => {
      if(star.constellation !== '') {
        acc.push(star.constellation);
      }
      return acc;
    }, []);
    return result;

    // Annotation:
    // I sorted the array of stars and then reduced thar array into an array of constellation 
    // names. 
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    const result = characters.reduce((acc, char) => {
      return acc += char.weapons.reduce((acc, charWeapon) => {
        let currentWeapon = Object.keys(weapons).findIndex(weapon => weapon === charWeapon);
        let currentDamage = Object.values(weapons)[currentWeapon].damage;
        return acc += currentDamage;
      }, 0);
    }, 0);
    return result;

    // Annotation:
    // I used a reduce method to return the total weapon damage for each character by 
    // by reducing their weapons array and finding the damage of each weapon in their arsenal
    // by utilizing the keys and values of each weapon. 
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object. 
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    const result = characters.reduce((acc, char) => {
      acc.push(char.weapons.reduce((acc, charWeapon) => {
        if(!acc[char.name]) {
          acc[char.name] = {
            'damage': 0,
            'range': 0
          };
        }
        let currentWeapon = Object.keys(weapons).findIndex(weapon => weapon === charWeapon);
        let currentDamage = Object.values(weapons)[currentWeapon].damage;
        let currentRange = Object.values(weapons)[currentWeapon].range;
        acc[char.name].damage += currentDamage;
        acc[char.name].range += currentRange;
        return acc;
      }, {}));
      return acc;
    }, []);
    return result;

    // Annotation:
    // I chose to reudce the characters array, and then went in their weapons array. 
    // I reduded that array and accumlated the value of damage and range for each weapon 
    // on that character's weapon array. 
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the 
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    const result = movies.reduce((acc, movie) => {
      if(!acc[movie.title]) {
        acc[movie.title] = 0;
      }
      movie.dinos.forEach(dino => {
        let currentIndex = Object.keys(dinosaurs).findIndex(dinosaur => dinosaur === dino);
        let isDinoAwesome = Object.values(dinosaurs)[currentIndex].isAwesome;
        isDinoAwesome ? acc[movie.title]++ : acc;
        return acc;
      });
      return acc;
    }, {});
    return result;

    // Annotation:
    // I reduced the movies array and set and checked each dinosaurs 
    // isAwesome value from the dinosaurs object, and incremented once for 
    // each awesome dinosaur.
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      { 
        'Steven Spielberg': 
          { 
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37 
          },
        'Joe Johnston': 
          { 
            'Jurassic Park III': 44 
          },
        'Colin Trevorrow': 
          { 
            'Jurassic World': 56
           },
        'J. A. Bayona': 
          { 
            'Jurassic World: Fallen Kingdom': 59 
          } 
      }
    */

    const result = movies.reduce((acc, movie) => {
      let moviesDirected = movies.reduce((acc, currMovie) => {
        if(!acc[currMovie.title] && currMovie.director === movie.director) {
          acc[currMovie.title] = parseInt(currMovie.cast.reduce((acc, castMember) => {
            let index = Object.keys(humans).findIndex(human => human === castMember);
            let age =  currMovie.yearReleased - Object.values(humans)[index].yearBorn;
            return acc += age;
          }, 0) / currMovie.cast.length);
        }
        return acc;
      }, {});
      if(!acc[movie.director]) {
        acc[movie.director] = moviesDirected;
      }
      return acc;
    }, {});
    return result;

    // Annotation:
    // This one was hard. 
    // I reduced the movied arreay, then I stored the moviesDirected object 
    // using another reduce which returned an object containing the key/value
    // pairs of the current movie, and the average age of the cast. 
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      }, 
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */
    const result = Object.keys(humans).reduce((acc, human)  => {
      let checkCasting = movies.reduce((acc, movie) => {
        acc.push(movie.cast.includes(human));
        return acc;
      }, []);
      if(checkCasting.every(casting => casting === false)) {
        let index = Object.keys(humans).findIndex(name => name === human);
        let imdb = Object.values(humans)[index].imdbStarMeterRating;
        let nationality = Object.values(humans)[index].nationality.trim();
        acc.push({'name': human, 'nationality': nationality, 'imdbStarMeterRating': imdb });
      }
      acc.sort((a, b) => {
        if(a.nationality < b.nationality) {
          return -1;
        }
        if(a.nationality > b.nationality) {
          return 1;
        }});
      return acc;
    }, []);
    return result;

    // Annotation:
    // I used a reduce to ocheck to see if the current human was casted in a movie. 
    // From there, I grabbed the necessary information to push the actor into a new array. 
    // Lastly, I sorted the array based on the actor's nationality. 
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    const result = Object.keys(humans).reduce((acc, human) => {
      let index = Object.keys(humans).findIndex(name => name === human);
      let yearBorn = Object.values(humans)[index].yearBorn;
      if(movies.reduce((check, movie) => {
        if(movie.cast.includes(human)) {
          check = true;
        }
        return check;
      }, false)) {
        let ageValues = movies.reduce((agesInMovie, movie) => {
          if(movie.cast.includes(human)) {
            let age = movie.yearReleased - yearBorn;
            agesInMovie.push(age);
          }
          return agesInMovie;
        }, []);
        acc.push({'name': human, 'ages': ageValues});
      }
      return acc;
    }, []);
    return result;

    // Annotation:
    // I used a reduce method on the human object to check each name. From there, 
    // I used a reduce to see if that human was casted in each movie.
    // If the human was casted, I then created an array of age values for the movies they were in.
    // Finally, I pushed an object literal containing the actors name and age values, into our final accumulator array. 
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  dinosaurPrompts
};