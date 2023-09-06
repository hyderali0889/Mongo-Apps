import NotificationJS from 'notification-npm'
import '/node_modules/notification-npm/index.css'


export default function shownotification( msg , type , duration ){
    const notification = new NotificationJS({
        message: msg,  //specify message here
        type:type,                          //specify type of notification
        duration: duration,                          //duration in milliseconds
        theme: 'dark',
        innerHeight:250,
        outerHeight:250,       //theme of notification
        sound: true,                             //for notificaion sound
        disable_timer:false,
                          //set it true of you don't want timer
    })

    notification.show()
}