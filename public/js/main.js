var socket = io(),
    registered = false,
    myRole = null;

$('.register button').click(function() {
    var role = $(this).val();
    console.log(role);
    
    socket.emit('register', role, function (done) {
        console.log(done);
        
        if (done.type && done.type == "error") {
            $('.error').text(role + " is already registered!");
        } else {
            $('.register').slideUp();
            $('.' + role + '-console').slideDown();

            myRole = role;
            registered = true;

            init(done);
        }
    });
});

var roleUpdate = { 
    pilot: function(msg) {
        switch (msg.type) {
            case "allocation":
                $('[data-power]').removeClass('powered');
                $('[data-power="' + msg.system + '"]').addClass('powered');
                break;
        }
    },

    engineer: function(msg) {

    }
};

socket.on('message', function(msg) {
    console.log(msg);
    if (registered) {
        roleUpdate[myRole](msg);
    }
});

function init(msg) {
    roleUpdate[myRole]({ type:'allocation', system:msg.poweredSystem });
}

function moveShip() {
    var newX = $('#ship-x').val(),
        newY = $('#ship-y').val();

    console.log(newX, newY);
    socket.emit('action', 
        { type: 'navigation', x: newX, y: newY });
}

function allocatePower(target) {
    socket.emit('action', 
        { type: 'allocate', system: target });
}

$('.console-wrapper').on('click', '.action', function() {
    var action = $(this).attr('data-action'),
        target = $(this).attr('data-target') || null;
    console.log(action, target);

    switch(action) {
        case "navigation":
            moveShip();
            break;
        case "allocate":
            allocatePower(target);
            break;
        default:
            console.log('not an accepted action');
    }
});