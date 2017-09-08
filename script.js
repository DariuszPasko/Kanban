$(function(){

    
    // funkcja generująca ilośc znakow /id  //
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    
    function Column(name) { // funkcja konstrułująca (klasa)
        var self = this; 

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            
            
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').addClass('darken-1').addClass('btn').addClass('btn-default').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').addClass('btn').addClass('btn-default').text('Add a card');
            
            
            
            //podpięcie zdarzeń /button 
            
            $columnDelete.click(function() {
                $(self).addClass('animated').addClass('slideOutUp');
                self.removeColumn();
            });
            
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });
            
            
            // właczenie węzłow
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            
        
            
            return $column; //zwracanie kolumny
            
        } //kreator funkcji  kolumn
    } //funkcja kolumn / funkcja konstrułująca (klasa) 
    
    
    Column.prototype = {  // dołączenie prototypu (metody) do klasy (funkcja konstrułująca) Column
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };
    
    
    //początek funkcj konstrułującej (klasa)
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard(); 

        function createCard() {
            
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').addClass('btn').addClass('btn-default').text('x');
            var $bootclass = $('button').addClass('btn-default');
            var $bootclass = $('button').addClass('btn');
            
            
            $cardDelete.click(function(){
                self.removeCard();
            });
            
            // łączenie węzłow
            
            $card.append($cardDelete)
                .append($cardDescription);
            
            return $card; // zwracanie karty 
        }
    } //koniec funkcji konstrułującej (klasa) Card / 
    
    
    
    // dołączenie prototypu (metody) do klasy (funkcja konstrułująca) Card
    Card.prototype = { 
        removeCard: function() {
            this.$element.remove();
        }
    } // koniec prototype 
    
    
    
    var board = { // obiekt tablicy 
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };
    
   
    
    // funkcja przeciągni / upuśc jQuery UI 
    
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    // zdażenie kliknięcia 
    $('.create-column')
        .click(function(){
        var name = prompt('Enter a column name');
        var column = new Column(name);
        board.addColumn(column);
    });
    
    
    //fragmenty odpowiedzialne za stworzenie podstawowych elementow w kanbanie:
    
    
    // TWORZENIE KOLUMN
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // DODAWANIE KOLUMN DO TABLICY
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // DODAWANIE KART DO KOLUMN
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    
    
    //bootstrap
   
    $('button:contains(x)').addClass('btn').addClass('btn-default');
    
    $('add-card').addClass('btn').addClass('btn-default');
    
    $('column').addClass('primary-color');
  
   
    // przycisk uruchamiający kanban
    
    $('.start').click( function(){
        
        $('.start').css("display", "none");
        $('.container').css("display", "inline-block");
        $('.exit').css("display", "inline-block");
        
        
    });
    
    //przycisk wyjścia 
    
    $('.exit').click( function(){

        $('.start').css("display", "inline-block");
        $('.container').css("display", "none");
        $('.exit').css("display", "none");


    });
   // licznik 
    var start = document.getElementsByClassName('column').length;
    console.log(start);
    
}) //funkcja ready

