import { combineReducers } from 'redux';
import user from './user';
import analytics from './analytics';
import repository from './repositories';
import challenge from './challenges';
import event from './events';

const rootReducer = combineReducers({
    user,
    analytics,
    repository,
    challenge,
    event,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;