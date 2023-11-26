// // import {useViewState} from "./viewStore.ts";
//
// import deckOptions from "./components/DeckOptions.tsx";
//
// function viewReducer(state, action) {
//         switch (action.type) {
//             case 'show_deck_options': {
//                 return {
//                     ...state, deckOptions: true}
//                 };
//             }
//             case 'changed_name': {
//                 return {
//                     name: action.nextName,
//                     age: state.age
//                 };
//             }
//         }
//         throw Error('Unknown action: ' + action.type);
//     }
// }
//
// export default viewReducer