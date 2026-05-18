const quizData = {
            politics: {
                easy:[
                { question: "Who is the current President of the United States?", options: ["Joe Biden", "Donald Trump", "Barack Obama", "Kamala Harris"], correct: 1 },
                { question: "Which country has the longest written constitution?", options: ["USA", "India", "China", "UK"], correct: 1 },
                { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 }],
                 medium:[{ question: "How many members are in the U.S. Senate?", options: ["50", "100", "435", "538"], correct: 1 },
                { question: "Who was the first female Prime Minister of the UK?", options: ["Theresa May", "Margaret Thatcher", "Elizabeth II", "Angela Merkel"], correct: 1 },
                { question: "What year did the European Union form?", options: ["1993", "1985", "2000", "1975"], correct: 0 },
                { question: "Which country is NOT a permanent member of the UN Security Council?", options: ["France", "China", "Germany", "Russia"], correct: 2 }],
                hard:[ { question: "What does NATO stand for?", options: ["North Atlantic Treaty Organization", "National Association of Trade Organizations", "New Atlantic Trade Order", "North American Treaty Organization"], correct: 0 },
                { question: "Who is known as the 'Father of the Nation' in India?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Subhas Chandra Bose"], correct: 1 },
                { question: "How many countries are in the European Union (as of 2024)?", options: ["27", "28", "25", "30"], correct: 0 }],
                },
            sports: {
                easy:[
                { question: "How many players are on a basketball team on the court?", options: ["5", "6", "7", "11"], correct: 0 },
                { question: "Which country won the FIFA World Cup 2022?", options: ["France", "Brazil", "Argentina", "Germany"], correct: 2 },
                { question: "What is the maximum score in a single frame of bowling?", options: ["100", "200", "300", "400"], correct: 2 }],
                 medium:[{ question: "In which sport would you perform a 'slam dunk'?", options: ["Volleyball", "Basketball", "Tennis", "Baseball"], correct: 1 },
                { question: "How many Grand Slam tournaments are there in tennis?", options: ["3", "4", "5", "6"], correct: 1 },
                { question: "What is the diameter of a basketball hoop in inches?", options: ["16", "18", "20", "22"], correct: 1 }],
                 hard:[{ question: "Which athlete has won the most Olympic gold medals?", options: ["Usain Bolt", "Michael Phelps", "Simone Biles", "Carl Lewis"], correct: 1 },
                { question: "In soccer, what does a red card mean?", options: ["Warning", "Ejection", "Timeout", "Penalty kick"], correct: 1 },
                { question: "How long is a marathon?", options: ["26.2 miles", "20 miles", "30 miles", "25 miles"], correct: 0 },
                { question: "Which sport uses a shuttlecock?", options: ["Tennis", "Squash", "Badminton", "Table Tennis"], correct: 2 }]
                },
            entertainment: {
                easy:[
                { question: "Who directed the movie 'Titanic'?", options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Martin Scorsese"], correct: 1 },
                { question: "Which TV show features the characters Ross, Rachel, and Chandler?", options: ["How I Met Your Mother", "The Office", "Friends", "Seinfeld"], correct: 2 },
                { question: "What year was the first iPhone released?", options: ["2005", "2007", "2009", "2010"], correct: 1 }],
                medium:[{ question: "Who played Iron Man in the Marvel movies?", options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"], correct: 2 },
                { question: "Which band wrote the song 'Bohemian Rhapsody'?", options: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"], correct: 2 },
                { question: "What is the highest-grossing film of all time?", options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars"], correct: 1 },
                { question: "Who is known as the 'King of Pop'?", options: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"], correct: 1 }],
                hard:[{ question: "Which streaming service produced 'Stranger Things'?", options: ["Amazon Prime", "Netflix", "Disney+", "HBO Max"], correct: 1 },
                { question: "How many Harry Potter books are there?", options: ["5", "6", "7", "8"], correct: 2 },
                { question: "Who won the Oscar for Best Actor in 2020?", options: ["Leonardo DiCaprio", "Joaquin Phoenix", "Brad Pitt", "Adam Driver"], correct: 1 }
            ]
        }
        };

        // Global Variables
        let username = '';
        let currentCategory = '';
        let currentQuestionIndex = 0;
        let score = 0;
        let timeLeft = 30;
        let timerInterval;
        let selectedAnswer = null;
        let questions = [];

        // Page 1: Submit Name
        function submitName(){
            const name=document.getElementById('nameInput').value;
            username=name.trim();
            if(username===''){
                alert('Please enter the username ');
                return;
            }
            localStorage.setItem("username", username);// it is used to save the name in the local storage;
            document.getElementById('nameSection').classList.add('hidden');
            const greet=document.getElementById('greeting');
            greet.textContent=`Hello ${username} Select category to start the quizz!!!`;
            greet.classList.add('show');
            document.getElementById('categories').classList.add('show');
        }
          document.getElementById('nameInput').addEventListener('keypress',function(event){
            if(event.key==='Enter'){
                submitName();
            }
          })




        

        // Page 2: Select Category
        function selectCategory(category){
            currentCategory=category;
           
            document.getElementById('greeting').classList.remove('show');
            document.getElementById('categories').classList.remove('show');
            document.getElementById('difficulty').style.display="block";
            


        }
        function selectdifficulty(level){
             questions=quizData[currentCategory][level];
             currentQuestionIndex=0;
             score=0;
             document.getElementById('difficulty').style.display = "none";
    document.getElementById('quizSection').classList.add('show');
    loadQuestion();
    startTimer();

           

        }

        // Page 3: Quiz Functions
        function loadQuestion() {
            if (currentQuestionIndex >= questions.length) {
                showResults();
                return;
            }

            const question = questions[currentQuestionIndex];
            selectedAnswer = null;
            
            // Update progress
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            
            // Update question info
            document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1}`;
            document.getElementById('questionCount').textContent = `${currentQuestionIndex + 1}/${questions.length}`;
            document.getElementById('currentScore').textContent = score;
            document.getElementById('questionText').textContent = question.question;
            
            // Load options
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.textContent = option;
                optionDiv.onclick = () => selectAnswer(index);
                optionsContainer.appendChild(optionDiv);
            });
            
            document.getElementById('nextBtn').disabled = true;
            timeLeft = 30;
        }

        function selectAnswer(index) {
            if (selectedAnswer !== null) return; // Already answered
            
            selectedAnswer = index;
            const question = questions[currentQuestionIndex];
            const options = document.querySelectorAll('.option');
            
            // Disable all options
            options.forEach(opt => opt.classList.add('disabled'));
            
            // Show correct/wrong
            if (index === question.correct) {
                options[index].classList.add('correct');
                score += 10;
                document.getElementById('currentScore').textContent = score;
            } else {
                options[index].classList.add('wrong');
                options[question.correct].classList.add('correct');
            }
            
            // Stop timer
            clearInterval(timerInterval);
            
            // Enable next button
            document.getElementById('nextBtn').disabled = false;
        }

        function nextQuestion() {
            currentQuestionIndex++;
            loadQuestion();
            startTimer();
        }

        function startTimer() {
            const timerElement = document.getElementById('timer');
            timerElement.classList.remove('warning');
            
            timerInterval = setInterval(() => {
                timeLeft--;
                timerElement.textContent = timeLeft + 's';
                
                if (timeLeft <= 10) {
                    timerElement.classList.add('warning');
                }
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    if (selectedAnswer === null) {
                        // Time's up, show correct answer
                        const question = questions[currentQuestionIndex];
                        const options = document.querySelectorAll('.option');
                        options.forEach(opt => opt.classList.add('disabled'));
                        options[question.correct].classList.add('correct');
                        document.getElementById('nextBtn').disabled = false;
                    }
                }
            }, 1000);
        }

        function quitQuiz() {
            if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
                clearInterval(timerInterval);
                document.getElementById('quizSection').classList.remove('show');
                document.getElementById('greeting').classList.add('show');
                document.getElementById('categories').classList.add('show');
            }
        }

        // Page 4: Results
        function showResults() {
            clearInterval(timerInterval);
            
            // Hide quiz section
            document.getElementById('quizSection').classList.remove('show');
            
            // Show results
            document.getElementById('resultsSection').classList.add('show');
            
            // Calculate stats
            const totalQuestions = questions.length;
            const correctAnswers = score / 10;
            const wrongAnswers = totalQuestions - correctAnswers;
            const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
            
            // Update results
            document.getElementById('finalScore').textContent = score;
            document.getElementById('totalQuestions').textContent = totalQuestions;
            document.getElementById('correctAnswers').textContent = correctAnswers;
            document.getElementById('wrongAnswers').textContent = wrongAnswers;
            document.getElementById('accuracy').textContent = accuracy + '%';
            
            // Show message based on score
            let message = '';
            if (accuracy >= 90) {
                message = `Outstanding, ${username}! 🏆 You're a true master!`;
            } else if (accuracy >= 70) {
                message = `Great job, ${username}! 🎉 Keep it up!`;
            } else if (accuracy >= 50) {
                message = `Good effort, ${username}! 👍 Practice makes perfect!`;
            } else {
                message = `Nice try, ${username}! 💪 You'll do better next time!`;
            }
            
            document.getElementById('resultsMessage').textContent = message;
        }

        function restartQuiz() {
            document.getElementById('resultsSection').classList.remove('show');
            document.getElementById('greeting').classList.add('show');
            document.getElementById('categories').classList.add('show');
        }

        function startOver() {
            document.getElementById('resultsSection').classList.remove('show');
            document.getElementById('nameSection').classList.remove('hidden');
            document.getElementById('nameInput').value = '';
            username = '';
        }
        // Run when page loads
