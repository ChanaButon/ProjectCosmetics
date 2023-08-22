import produce from 'immer';

const initialState = {
    currentUser: {}
    

}







export default produce((state, action) => {
    switch (action.type) {
        // case 'ADD_USER':
        //     { state.pupils.push(action.payLoad) }
        //     break;
        case 'SET_USER':
            { state.currentUser = action.payload }
            break;
            // case 'UP
        // case 'UPDATE_PUPIL':
        //     { state.pupils.find(x => x.id == action.payLoad.id).name = action.payLoad.name }
        //     break;
        // case 'DELETE':
        //     {
        //         state.pupils.filter(r => r.id != action.payLoad)//נשלח קוד שאותו נרצה למצוא ולמחוק
        //     }
        //     break;


        
      
    }

}, initialState)


