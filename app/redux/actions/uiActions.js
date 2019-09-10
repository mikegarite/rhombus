import * as types from '../constants/uiConstants';

export const toggleAction = { type: types.TOGGLE_SIDEBAR };
export const openMenuAction = { type: types.OPEN_MENU };

export const openAction = initialLocation => ({
  type: types.OPEN_SUBMENU,
  initialLocation
});

export const closeAllAction = { type: types.CLOSE_ALL_SUBMENU };

export const changeThemeAction = theme => ({
  type: types.CHANGE_THEME,
  theme
});

export const changeModeAction = mode => ({
  type: types.CHANGE_MODE,
  mode
});

export const changeLayoutAction = layout => ({
  type: types.CHANGE_LAYOUT,
  layout
});

export const changeDirectionAction = direction => ({
  type: types.CHANGE_DIRECTION,
  direction
});

export const playTransitionAction = isLoaded => ({
  type: types.LOAD_PAGE,
  isLoaded
});

export const viewPub = publisher => ({
  type: types.VIEW_PUB,
  publisher
});

export const publisherDataSuccess = publisher => ({
  type: types.PUBLISHER_DETAILS,
  publisher
});

export const publisherAnalyticsDataSuccess = publisherAnalytics => ({
  type: types.PUBLISHER_ANALYTICS,
  publisherAnalytics
});

export const publisherEmbedsDataSuccess = publisherEmbeds => ({
  type: types.PUBLISHER_EMBEDS,
  publisherEmbeds
});