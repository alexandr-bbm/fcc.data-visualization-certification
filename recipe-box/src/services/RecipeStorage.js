let instance = null;

/**
 * Singleton
 */
export default class RecipeStorage  {
    constructor () {
        if(!instance){
            instance = this;
        }
        return instance;
    }

    get recipes () {

    }

}