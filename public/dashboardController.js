
// var app1=angular.module("movieApp",[])
// app1.controller('dashboardController', ['$scope', '$http','$window', function($scope, $http,$window) {
//   $scope.movies = [];
//   $scope.filteredMovies = [];
//   $scope.searchQuery = 'avengers'; // Default search query for the example
//   $scope.loading = true;
//   $scope.errorMessage = '';

//   const API_KEY = 'c82153085ae4215963f520dcb3a816f3';
//   const API_URL = 'https://api.themoviedb.org/3/search/movie';

//   // Function to fetch movies based on the search query
//   $scope.searchMovies = function() {
//     $scope.loading = true;
//     $scope.errorMessage = '';
//     const url = `${API_URL}?api_key=${API_KEY}&query=${$scope.searchQuery}`;

//     $http.get(url)
//       .then(function(response) {
//         console.log(response.data);
//         if (response.data.results) {
//           $scope.movies = response.data.results.map(movie => ({
//             l: movie.title,
//             y: movie.release_date.split('-')[0],
//             r: movie.original_language,
//             ad: movie.vote_average,
//             ol:movie.original_title,
//             i: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//             ticketsAvailable: Math.floor(Math.random() * 100) // Random tickets available
//           }));
//           $scope.filteredMovies = $scope.movies;
//         } else {
//           $scope.movies = [];
//           $scope.errorMessage = 'No movies found.';
//         }
//       }).catch(function(error) {
//         console.error('Error fetching movies:', error);
//         $scope.errorMessage = 'Error fetching movies. Please try again later.';
//       }).finally(function() {
//         $scope.loading = false;
//       });
//   };

//   // Function to search movies with filters
//   $scope.searchMoviesWithFilters = function() {
//     $scope.searchMovies(); // Fetch the movies first
//     $scope.$watch('movies', function(newValue, oldValue) {
//       if (newValue !== oldValue) {
//         $scope.filterMovies(); // Apply filters after movies are fetched
//       }
//     });
//   };

//   // Function to filter movies based on multiple criteria
//   $scope.filterMovies = function() {
//     $scope.filteredMovies = $scope.movies;

//     if ($scope.searchYear) {
//       $scope.filteredMovies = $scope.filteredMovies.filter(movie => movie.y == $scope.searchYear);
//     }

//     if ($scope.searchLanguage) {
//       $scope.filteredMovies = $scope.filteredMovies.filter(movie => movie.r.toLowerCase().includes($scope.searchLanguage.toLowerCase()));
//     }

//     if ($scope.searchTickets !== undefined) {
//       $scope.filteredMovies = $scope.filteredMovies.filter(movie => movie.ticketsAvailable >= $scope.searchTickets);
//     }
//   };


//   // $scope.goToProfile = function() {
//   //   $location.path('/profile'); // Update with your actual profile path
//   // };

//   // Function to log out and redirect to the sign-in page
//   $scope.logout = function() {
//     // Perform any necessary logout operations here

//     // Redirect to the sign-in page
//     $window.open('/signIn/signin.html', '_blank'); // Redirect to the sign-in page
//   };

//   // Initial search
//   $scope.searchMovies();
// }]);



var app1 = angular.module("movieApp", []);
app1.controller('dashboardController', ['$scope', '$http', '$window', function($scope, $http, $window) {
  $scope.movies = [];
  $scope.filteredMovies = [];
  $scope.searchQuery = 'avengers'; // Default search query for the example
  $scope.loading = true;
  $scope.errorMessage = '';

  const API_KEY = 'c82153085ae4215963f520dcb3a816f3';
  const API_URL = 'https://api.themoviedb.org/3';

  // Function to fetch movies based on the search query
  $scope.searchMovies = function() {
    $scope.loading = true;
    $scope.errorMessage = '';
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${$scope.searchQuery}`;

    $http.get(url)
      .then(function(response) {
        console.log(response.data);
        if (response.data.results) {
          $scope.movies = response.data.results.map(movie => ({
            id: movie.id,
            l: movie.title,
            y: movie.release_date.split('-')[0],
            r: movie.original_language,
            ad: movie.vote_average,
            ol: movie.original_title,
            i: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            ticketsAvailable: Math.floor(Math.random() * 100) // Random tickets available
          }));
          $scope.filteredMovies = $scope.movies;
        } else {
          $scope.movies = [];
          $scope.errorMessage = 'No movies found.';
        }
      }).catch(function(error) {
        console.error('Error fetching movies:', error);
        $scope.errorMessage = 'Error fetching movies. Please try again later.';
      }).finally(function() {
        $scope.loading = false;
      });
  };

  // Function to search movies with filters
  $scope.searchMoviesWithFilters = function() {
    $scope.searchMovies(); // Fetch the movies first
    $scope.$watch('movies', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.filterMovies(); // Apply filters after movies are fetched
      }
    });
  };

  // Function to filter movies based on multiple criteria
  $scope.filterMovies = function() {
    $scope.filteredMovies = $scope.movies;

    if ($scope.searchYear) {
      $scope.filteredMovies = $scope.filteredMovies.filter(movie => movie.y == $scope.searchYear);
    }

    if ($scope.searchLanguage) {
      $scope.filteredMovies = $scope.filteredMovies.filter(movie => movie.r.toLowerCase().includes($scope.searchLanguage.toLowerCase()));
    }

    if ($scope.searchTickets !== undefined) {
      $scope.filteredMovies = $scope.filteredMovies.filter(movie => movie.ticketsAvailable >= $scope.searchTickets);
    }
  };

  // Function to play trailer
  $scope.playTrailer = function(movieId) {
    const url = `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}`;

    $http.get(url)
      .then(function(response) {
        if (response.data.results && response.data.results.length > 0) {
          const trailer = response.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
          if (trailer) {
            const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
            $window.open(trailerUrl, '_blank');
          } else {
            alert('Trailer not found.');
          }
        } else {
          alert('Trailer not found.');
        }
      }).catch(function(error) {
        console.error('Error fetching trailer:', error);
        alert('Error fetching trailer. Please try again later.');
      });
  };

  // Function to log out and redirect to the sign-in page
  // $scope.logout = function() {
  //   // Perform any necessary logout operations here

  //   // Redirect to the sign-in page
  //   $window.open('/signIn/signin.html', '_blank'); // Redirect to the sign-in page
  // };

  $scope.logout = function() {
    // Perform any necessary logout operations here

    // Redirect to the sign-in page
    $window.location.href = '/public/index.html'; // Replace with the actual path to your sign-in page
  };

  // Initial search
  $scope.searchMovies();
}]);
