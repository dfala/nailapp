angular.module('NailChatApp', [])
.controller('ChatController', ['$scope', 'convoService', '$timeout', function ($scope, convoService, $timeout) {
  var messages = convoService.returnNewRandomizedArray();

  // $scope.userMessage = 'The 2008 presidential campaign of Barack Obama, then junior United States Senator from Illinois, was announced on February 10, 2007 in Springfield, Illinois.';

  $scope.thread = [];
  newBotMessage("What brings you here?")

  function newBotMessage (text) {
    $timeout(function () {
      $scope.loading = true;
      scrollContainer();
    }, 1200);

    $timeout(function () {
      $scope.loading = false;
      $scope.thread.push({
        sender: 'bot',
        text: text
      });
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
    "That sounds really hard.",
    "If I were in your position, I'd feel the same way!",
    "You're so right",
    "Tell me more about that",
    "What do you mean by that?",
    // "So what you are saying is, "TEXT". Is that right?",
    "Mm yeah. How does that make you feel?",
    "You're so brave. How does your family feel about this?",
    "Tell me what's worrying you.",
    "Of course you're feeling like this. I'd feel the same way.",
    "Tell me everything that’s led up to this.",
    "What set off these feelings?",
    "What’s the thing that’s worrying you the most?",
    "Help me undestand a little better how you're feeling about this",
    "I can't imagine what you're going through",
    "I am so sorry you are going through this. You are the last person on this earth who deserves that.",
    "It's not your fault",
    "You deserve so much better",
    ":(",
    "I’m sorry you’re hurting so much :("
  ];

  return service;
}]);
