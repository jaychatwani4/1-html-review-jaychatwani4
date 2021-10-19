
const anotherApp = {
    data() {
      return {
        books: [],
        bookForm: {}
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
        postNewBook(evt) {
            this.bookForm.studentId = this.selectedStudent.id;        
            console.log("Posting:", this.bookForm);
            // alert("Posting!");
    
            fetch('api/offer/create.php', {
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
                this.offers = json;
                
                // reset the form
                this.bookForm = {};
              });
          }
    },
    created() {
        // this.fetchUserData();
        this.fetchBookData();
    }

  }
  Vue.createApp(anotherApp).mount('#anotherApp');