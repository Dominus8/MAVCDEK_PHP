let app = new Vue({
  el: '#app',
  components: {
    autocomplete: Autocomplete
  },

  data() {
    return {      
      sending: {
        cityIn: '',
        cityOut: '',
        weight: '',
        sizeW: '',
        sizeH: '',
        sizeD: '',
      },

      calcResult: {
        sending: {
          doorToDoor: 1,
          storeToDoor: 2,          
          storeToStore: 3
        },

        expressLight: {
          doorToDoor: 4,
          storeToDoor: 5,          
          storeToStore: 6
        },

        expressMainstream:{
          storeToStore: 7
        },

        econom:{
          storeToDoor: 8,
          storeToStore: 9
        },
        expressEconom:{
          storeToStore: 10
        }
      }
    };
  },

  methods: {

    async calculate(){
      let res;

      try{
        res = await $.post('/calculate');
        // if(res.ok){

        // }
        console.log(res);
      }catch(er){
        console.error(er);
      }
    },

    async searchCities(input){
      if(input.length < 1){
        return [];
      }

      let res;

      try {
          res = await $.ajax({
            url: 'https://api.cdek.ru/city/getListByTerm/jsonp.php?callback=?',
            dataType: 'jsonp',
            data: {
              q: function () { return input; },
              name_startsWith: function () { return input; }
            }
          });
          
          if(!res){
            return [];
          }
          return res.geonames;
      } catch (er) {
          console.error(er);
      }
    },

    getresValue(res) {
      return res.name;
    }
  }
});