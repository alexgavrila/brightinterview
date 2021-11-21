<template>
  <div>
    <div>
      <button v-on:click="newGame">New game</button>
      <button v-on:click="advanceGame" :disabled="canAdvanceGame">Next round</button>
    </div>
    {{wonString}}
    <div class="container">
      <stats :data=playerData class="stats">
      </stats>
      <stats :data=enemyData class="stats">
      </stats>
    </div>
    <game-log :data=gameLog> </game-log>
  </div>
</template>

<script>
import Stats from './components/Stats.vue'
import GameLog from './components/GameLog.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Stats,
    GameLog
  },
  data: function() {
    return {
      gameStarted:false,
      playerData:{},
      enemyData:{},
      gameWon: 0,
      gameId: 0,
      gameLog: []
    };
  },
  methods: {
    newGame: function () {
      axios.post(`${process.env.VUE_APP_API_URL}/game`)
        .then((e)=> {
          this.playerData = e.data.result.player;
          this.enemyData = e.data.result.enemy;
          this.gameWon = e.data.result.won;
          this.gameId = e.data.id;
          this.gameStarted = true;
          this.gameLog = e.data.result.log;
        });
    },
    advanceGame: function () {
      axios.get(`${process.env.VUE_APP_API_URL}/game/${this.gameId}`)
        .then((e)=> {
          this.playerData = e.data.result.player;
          this.enemyData = e.data.result.enemy;
          this.gameWon = e.data.result.won;
          this.gameLog = e.data.result.log;
        });
    }
  },
  computed: {
    canAdvanceGame() {
      return !this.gameStarted || this.gameWon != 0;
    },
    wonString() {
      switch(this.gameWon) {
        case 1: {
          return "Draw";
        }
        case 2: {
          return `${this.enemyData.name} won`;
        }
        case 3: {
          return `${this.playerData.name} won`;
        }
        default:
          return " ";
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  all:unset;
  background-color:#009ec2;
  color:white;
  padding:1em;
  margin:0.5em;
  border-radius:5px;
  cursor:pointer;
}

button:hover {
  background-color:#007994;
}

button:disabled {
  background-color:#aaa;
  cursor:default;
}

.container {
  display:grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
