
  function onLoad(){
    //Validation to allow only positive numbers
    $("#count").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter.
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
  }

  var interval;
    function startTimer(){
      //hide the game end message
      var count = $("#count").val();

      //if timer value is empty display error message
      if(count=="" || count==0){
        alert("Please enter timer value greater than zero");
      }
      //start timer logic
      else{
        $("#startTimerBtn").removeAttr("onclick");
        //start timer
        runTimer(count);
      }
    }

    function runTimer(count){
      var timer = 0;
      interval = setInterval(function(){
          timer++;
          //check if timer reached the target value
          if (timer == count) {
            clearTimer();
          }

          //display timer value
          $("#counter").html(timer);

          //highlight both divs if timer is divisible by 3 and 5
          if(timer%3==0 && timer%5==0){
            $("#fingers").addClass("chat");
            $("#toes").addClass("chat");
          }
          //highlight finger div if timer is divisible by 3
          else if(timer%3==0){
            $("#fingers").addClass("chat");
            $("#toes").removeClass("chat");
          }
          //highlight toes div if timer is divisible by 5
          else if(timer%5==0){
            $("#fingers").removeClass("chat");
            $("#toes").addClass("chat");
          }
          //remove both highlight if timer is not divisible by 3 or 5
          else{
            $("#fingers").removeClass("chat");
            $("#toes").removeClass("chat");
          }
          if(timer==count){
            setTimeout(function() {
          	alert("Please click on Reset to start over again!");
          },10)
          }

      },
      1000);
    }

    function clearTimer(){
      //clear timer
      $('#startTimerBtn').attr('onclick', 'startTimer()');
      clearInterval(interval);
    }

    function reset(){
        $("#count").val("");
        resetUI();
        //clear Timer
        clearInterval(interval);
    }

    function restart(){
        //reset UI elements
        resetUI();
        //start timer again
        clearInterval(interval);
        startTimer();
    }

    function resetUI() {
        $('#startTimerBtn').attr('onclick', 'startTimer()');
        $("#counter").text("0");
        $("#fingers").removeClass("chat");
        $("#toes").removeClass("chat");
    }
