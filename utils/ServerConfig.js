import Globals from "./Globals";

export function ServerSetup(countryType, isLive) {
    if (countryType === 'uk') {
        if (isLive) {
            Globals.WEBSITE_URL_LIVE = "https://www.feelgoodcontacts.com/";
            Globals.API_URL = "https://api.feelgoodcontacts.net/api/gbp/";
        }
        else
        {
            Globals.WEBSITE_URL_LIVE = "https://ukstaging.lensgroup.co/";
            Globals.API_URL = "https://api2.lensgroup.co/api/gbp/";
        }
    }
    else {
        if (isLive) {
            Globals.WEBSITE_URL_LIVE = "https://www.feelgoodcontacts.com/";
            Globals.API_URL = "https://api.feelgoodcontacts.net/api/gbp/";
        }
        else
        {
            Globals.WEBSITE_URL_LIVE = "https://ukstaging.lensgroup.co/";
            Globals.API_URL = "https://api2.lensgroup.co/api/gbp/";
        }
       
    }
}