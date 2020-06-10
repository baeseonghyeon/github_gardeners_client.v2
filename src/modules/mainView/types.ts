import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import IChallenge from '../../api/interfaces/Challenge';

// 한번에 모두 import 해와서 actions 에 담았기 때문에
// 이 부분이 액션의 종류가 만하져도 한 줄로 작성 할 수 있어서 매우 간편합니다.
export type MainViewAction = ActionType<typeof actions>;

export type MainView = {
  selectedChallenge : IChallenge | null
};

export type MainViewState = MainView;