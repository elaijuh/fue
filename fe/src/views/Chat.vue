<template>
  <v-layout row>
    <v-flex order-xs2 style="position: relative;">
      <div class="chat-container">
        <message :messages="messages" @imageLoad="scrollToEnd"></message>
      </div>
      <emoji-picker :show="emojiPanel" @close="toggleEmojiPanel" @click="addMessage"></emoji-picker>
      <div class="typer">
        <input type="text" placeholder="Message" @keyup.enter="sendMessage" v-model="content">
        <v-btn icon class="blue--text emoji-panel" @click="toggleEmojiPanel">
          <v-icon>mood</v-icon>
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EmojiPicker from '@/components/Chat/EmojiPicker.vue'
import Message from '@/components/Chat/Message.vue'

export default {
  data() {
    return {
      content: '',
      recentChats: 'Recent Chats',
      emojiPanel: false,
    }
  },
  components: {
    'emoji-picker': EmojiPicker,
    message: Message,
  },
  created() {
    this.messagesFind({
      query: { $sort: { createdAt: -1 }, $limit: 100 },
    })
  },
  computed: {
    ...mapGetters('messages', {
      messages: 'list',
    }),
  },
  watch: {
    messages: function(val) {
      this.$nextTick(() => {
        this.scrollToEnd()
      })
    },
  },
  methods: {
    ...mapActions('messages', {
      messagesUpdate: 'update',
      messagesCreate: 'create',
      messagesFind: 'find',
    }),
    sendMessage() {
      if (this.content !== '') {
        this.messagesCreate({
          user: 'admin',
          content: this.content,
        })
        this.content = ''
      }
    },
    scrollToEnd() {
      var container = this.$el.querySelector('.chat-container')
      container.scrollTop = container.scrollHeight
    },
    addMessage(emoji) {
      this.content += emoji.value
    },
    toggleEmojiPanel() {
      this.emojiPanel = !this.emojiPanel
    },
  },
}
</script>

<style>
.typer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 4.9rem;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -5px 10px -5px rgba(0, 0, 0, 0.2);
}
.typer .emoji-panel {
  /*margin-right: 15px;*/
}
.typer input[type='text'] {
  position: absolute;
  left: 2.5rem;
  padding: 1rem;
  width: 80%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.25rem;
}
.chat-container {
  box-sizing: border-box;
  height: calc(100vh - 9.5rem);
  overflow-y: auto;
  padding: 10px;
  background-color: #f2f2f2;
}
.message {
  text-align: left;
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: #f48fb1;
}
.chat-container .username {
  font-size: 18px;
  font-weight: bold;
}
.chat-container .content {
  padding: 8px;
  background-color: #00bfa5;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 50%;
  word-wrap: break-word;
}
@media (max-width: 480px) {
  .chat-container .content {
    max-width: 60%;
  }
}
</style>
