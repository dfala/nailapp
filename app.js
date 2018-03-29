angular.module('NailChatApp', [])
.controller('ChatController', ['$scope', 'convoService', '$timeout', function ($scope, convoService, $timeout) {
  var messages = convoService.returnNewRandomizedArray();

  // $scope.userMessage = 'The 2008 presidential campaign of Barack Obama, then junior United States Senator from Illinois, was announced on February 10, 2007 in Springfield, Illinois.';

  $scope.thread = [];
  newBotMessage({
    sender: 'bot',
    text: "What brings you here?"
  })

  function newBotMessage (messageObject) {
    $timeout(function () {
      $scope.loading = true;
      scrollContainer();
    }, 1200);

    $timeout(function () {
      $scope.loading = false;
      $scope.thread.push(messageObject);
      scrollContainer();
    }, 2400);
  };

  function newUserMessage (text) {
    $scope.thread.push({
      sender: 'user',
      text: text
    });

    scrollContainer();
  };

  $scope.newMessage = function (reply) {
    if (!reply) return;
    newUserMessage(reply);
    newBotMessage(messages.shift());
    $scope.reply = '';

    if (!messages.length) {
      messages = convoService.returnNewRandomizedArray();
    };
  };

  function scrollContainer () {
    $timeout(function () {
      var wtf    = $('#messages');
      var height = wtf[0].scrollHeight;
      wtf.scrollTop(height);
    });
  };

}])

.factory('convoService', [function () {
  var service = {};

  service.returnNewRandomizedArray = function () {
    return shuffle(angular.copy(messages));
  };

  function shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  var messages = [
    {
      sender: 'bot',
      text: "That sounds really hard.",
    },
    {
      sender: 'bot',
      text: "If I were in your position, I'd feel the same way!",
    },
    {
      sender: 'bot',
      text: "You're so right",
    },
    {
      sender: 'bot',
      text: "Tell me more about that",
    },
    {
      sender: 'bot',
      text: "What do you mean by that?",
    },
    // "So what you are saying is, "TEXT". Is that right?",
    {
      sender: 'bot',
      text: "Mm yeah. How does that make you feel?",
    },
    {
      sender: 'bot',
      text: "You're so brave. How does your family feel about this?",
    },
    {
      sender: 'bot',
      text: "Tell me what's worrying you",
    },
    {
      sender: 'bot',
      text: "Of course you're feeling like this. I'd feel the same way",
    },
    {
      sender: 'bot',
      text: "Tell me everything that’s led up to this",
    },
    {
      sender: 'bot',
      text: "What set off these feelings?",
    },
    {
      sender: 'bot',
      text: "What’s the thing that’s worrying you the most?",
    },
    {
      sender: 'bot',
      text: "Help me undestand a little better how you're feeling about this",
    },
    {
      sender: 'bot',
      text: "I can't imagine what you're going through",
    },
    {
      sender: 'bot',
      text: "I am so sorry you are going through this. You are the last person on this earth who deserves that",
    },
    {
      sender: 'bot',
      text: "It's not your fault",
    },
    {
      sender: 'bot',
      text: "You deserve so much better",
    },
    {
      sender: 'bot',
      text: ":(",
    },
    {
      sender: 'bot',
      text: "I’m sorry you’re hurting so much :(",
    },
    {
      sender: 'bot',
      img: 'https://media.giphy.com/media/2WxWfiavndgcM/giphy.gif'
    },
    {
      sender: 'bot',
      img: 'https://media.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif'
    },
    {
      sender: 'bot',
      img: 'https://media.giphy.com/media/MuztdWJQ4PR7i/giphy.gif'
    }
  ];

  return service;
}]);
