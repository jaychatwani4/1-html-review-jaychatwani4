
const anotherApp = {
    data() {
      return {
        result: undefined,
        app: 0,
        books: [],
        bookForm: {},
        selectedBook: null
      }
    },
    computed: {
    },
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchBookData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        postBook(b) {
          if (this.selectedBook === null) {
              this.postNewBook(b);
          } else {
              this.postEditBook(b);
          }
        },
        postNewBook(b) {
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.bookForm = {};
              });
        },
        postEditBook(b) {
          fetch('api/books/update.php', {
              method:'POST',
              body: JSON.stringify(this.bookForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              this.bookForm = {};
            });
        },
        postDeleteBook(b) {
          if (!confirm("Are you sure you want to delete the offer from "+b.Title+"?")) {
              return;
          }
          
          fetch('api/books/delete.php', {
              method:'POST',
              body: JSON.stringify(b),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              this.bookForm = {};
            });
        },
        selectBook(b) {
          this.selectedBook = b;
          this.bookForm = Object.assign({}, this.selectedBook);
        },
        resetBookForm() {
          this.selectedBook = null;
          this.bookForm = {};
        }
    },
    created() {
        this.fetchBookData();
    }

  }
  Vue.createApp(anotherApp).mount('#anotherApp');