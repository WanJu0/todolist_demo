$(document).ready(function () {
    var source = $('#todo-list-item-template').html();
    var todoTemplate = Handlebars.compile(source);

    //prepare all todolist
    var todolistUI ='';
    $.each(todos,function(index, todo){
        todolistUI =todolistUI + todoTemplate(todo);
    });
   
    $('#todo-list').find('li.new').before(todolistUI);
   
    //enter editor mode
    $('#todo-list')
        .on('dblclick', '.content',function(e){
            $(this).prop('contenteditable',true).focus();
        })
        .on('blur','.content',function(e){
            var isNew = $(this).closest('li').is('.new')
            
            if (isNew) {
                var todo = $(e.currentTarget).text();
      
                todo = todo.trim();
                if (todo.length > 0) {
                    var order=$('#todo-list').find('li:not(new)').length +1 ;

                    $.post('todo/create.php',{ content: todo,order: order},function(data, textStatus, xhr) {
                        todo = {
                            id:data.id,
                            is_complete: false,
                            content: todo,
                    
                            };
                    
                            var li = todoTemplate(todo);
                            $(e.currentTarget).closest('li').before(li);

                    });
                   

                   
                }
        
                 $(e.currentTarget).empty();

            }
            else{
                $(this).prop('contenteditable',false);
            }
        
        })
        .on('click','.delete',function(e){
            var result = confirm('do you want to delete?');
            if(result){
                $(this).closest('li').remove();
                
            }
        })
        .on('click','.checkbox',function(e){
            $(this).closest('li').toggleClass('complete');


        });    
    $('#todo-list').find('ul').sortable({
        items: 'li:not(.new)',
    });
    


  });