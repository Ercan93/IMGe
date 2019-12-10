import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
        state: {
                sourceImage: null,
                lastImage: null,
                processingImage: null
        },
        getters: {
                sourceImageGetters(state) {
                        return state.sourceImage;
                },
                lastImageGetters(state) {
                        return state.lastImage;
                },
                processingImageGetters(state) {
                        return state.processingImage;
                }
        },
        mutations: {
                SOURCE_IMAGE_SET(state, payload) {
                        state.sourceImage = payload;
                },
                LAST_IMAGE_SET(state, payload) {
                        state.lastImage = payload;
                },
                PROCESSING_IMAGE_SET(state, payload) {
                        state.processingImage = payload;
                }
        },
        actions: {
                sourceImageSet(context, payload) {
                        context.commit('SOURCE_IMAGE_SET', payload);
                },
                lastImageSet(context, payload) {
                        context.commit('LAST_IMAGE_SET', payload);
                },
                processingImageSet(context, payload) {
                        context.commit('PROCESSING_IMAGE_SET', payload);
                }
        }
});