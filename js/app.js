// Dan Wenger
// Task Planner Assignment


// NOTE THIS IS PORTED FROM THE LAST ASSIGNMENT AND NOT UPDATED YET

//#region IPO Chart ===========================================================================
console.groupCollapsed("---------- IPO Chart ----------");
console.group("---------- INPUTS -----------");
console.log("We create a class Campground.");
console.log("We preload some data in array: campgroundsList.");
console.log("We declare filter variables and set = 'all': filterSectorSetting, filterWCSetting, filterWaterSetting.");
console.log("We declare some Element variables for the input form: inputFormEle, campgroundNameInputEle, sectorInputEle, sitesTotalInputEle, sitesFCInputEle, hasWCInputEle, hasWaterInputEle, mapURLInputEle, imageURLInputEle.");
console.log("Then we enter runtime...");
console.log("We then use event listeners for inputs from the following: Submit form, Reset form, filter by Sector, filter by Bathroom, filter by Water.");
console.groupEnd();

console.group("---------- PROCESS ----------");
console.log("We start by using the renderCampgrounds() function to display the array. All filters set to 'all'.");
console.log("We use the following functions on demand:");
console.log("Form Submit Button: Upon submit we validate data, create a new campground, add it to the campgrounds array, and run renderCampgrounds().")
console.log("Form Reset Button: We reset the form.")
console.log("Filter Selection: We update the filter clicked and run renderCampgrounds(). We count the results.");
console.groupEnd();

console.group("---------- OUTPUT -----------");
console.log("We list our campsites based on the current filter set.");
console.log("We return the count of the number of campsites to the div with id results-count.")
console.log("If a user clicks Form Submit and has not entered all data, we alert the user to fill out all fields.")
console.groupEnd();
console.groupEnd();
console.log("\n\n");
//#endregion ==================================================================================

//#region Define Campground Class =============================================================
class Campground {
    constructor(name, sector, sitesTotal, sitesFC, restrooms, water, mapURL, imageURL) {
        this.name = name;
        this.sector = sector;
        this.sitesTotal = sitesTotal;
        this.sitesFC = sitesFC;
        this.restrooms = restrooms;
        this.water = water;
        this.mapURL = mapURL;
        this.imageURL = imageURL;
    }
}

// Preload some data --------------------------------------------------------------------------
const campgroundsList = [

    new Campground('Dickinson Creek Campground', 'us191', 15, 15, true, false, 'https://maps.app.goo.gl/Z4AY66sftcDGfQyRA?g_st=ac', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFh6KP30ukzyT4nLDoPLgrCcrjwhyR_As7I4VouekdVQs4t--7N4StEEVsjptY4qIZ1C4tATzAcHmi7VJMEt-j6LBxUDzfi4JPZm3Pvz26SsKj3c07uTD3OIxGGjgQXI9upGxumUw=w408-h544-k-no'),
    new Campground('Pinnacles Campground', 'us26', 21, 21, true, true, 'https://maps.app.goo.gl/gfUmDyqadNuf7TY26?g_st=ac', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFjBQCoqTZHrOusUK4LwFM2QZDvLwg5vQ_VNUjp2qGoqOMPH6sT2G_MNCHZ3ukhGg18_WsKrFOhAlpgCi97-ZFMjvi57wPJ5Uzf1n9ecTJhDTBwmDo7CvI5CYX0A0cP7z1IZ5Es=w408-h544-k-no'),
    new Campground('The Narrows Campground', 'us191', 19, 15, true, false, 'https://maps.app.goo.gl/BPFGg25Sivobyz7J7?g_st=ac', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAG3D1Y_hQKjyXF8Ek6PpPC8nYhnD9cIgsj65JY0NAakxMTIRRpc55qB27nU_N_3pyYpUVuZv4qQPOlYIqARLCf5vNysm41exAmSZTCouXYeKi5HRP5x9aOHha9Q9gs7CDuwHMQ1Zw2vq3M-=w426-h240-k-no'),
    new Campground('Horse Creek Campground', 'us26', 9, 9, true, true, 'https://maps.app.goo.gl/kxVEo2qogX6wT5cHA?g_st=ac', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAG1KUaKsUNaSE_rtORuvpBj7Syks6q3yZoymUaV2sJI2oh4XSjd_Pq5JwNrzTVnZxLCdCsQURt4ejmnJTXcM4Zn8upwbkhwObSNSchiBumpDRkJ3iee8phVjr0KrsfUd_7CPyZx=w408-h306-k-no'),
    new Campground('Bridger-Teton National Forest', 'us191', 999, 999, false, false, 'https://maps.app.goo.gl/U6wzTwEEMHAXGP4v8', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHwbTkm1EeH5j8aLcDJlpUm2xqFyjZ_rw6a6rMsbC3B7eYGR6pEZ2gTKLH4iJU3JAwRG-_vhwvG7Ia3FpHalM2PCuSvcy9hrf5RFyAYyiuZD0ebOC8RYUDZW-7KnRtsqbe01SNOGw=w408-h306-k-no'),
    new Campground('Trails End Campground', 'us191', 8, 8, true, false, 'https://maps.app.goo.gl/skvFQ6MpMBNvficz5?g_st=ac', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHJNAArkl2ptTaEGuRL7MtSposwpww2AgvWbJWmUENfMYvrCsMA5Fs5rAzYNOVGUfCZ3SmkEuPXJqbhI_t6gyaEepJF9lLwEGI6HOzjpEROPD0tYpCli_vxEpufdHUaOwkydfEhmg=w408-h306-k-no'),
    new Campground('Fremont Lake Campground', 'us191', 54, 54, true, true, 'https://maps.app.goo.gl/ut13mZzPjKTxD9b47', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGO-sQjGkFLWpL0m1hc5gvq2Ld-Iw69oQeZIoluyG6yFUs7t3NZlURp6CPb0_51T9M2DjFxMS0A1QAOCFh1N97BiO2dTjdUi2Xjhknnr21u2WGQBS2cciUF7dbhK6B_i9U21M4x=w408-h306-k-no'),
    new Campground('Turpin Meadow Campground', 'us26', 18, 18, true, false, 'https://maps.app.goo.gl/HhGYRYtHR3aECFnd7', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFBscB-MNto1jkXqsERAklxDpeGjhhDVtacWuQYxjd7droGPEtNs4ettDTGPHt0jUutNni3294CQnzIJ6E4p6Eh9wtsMM-arCEeyXLgxJA_LWHcaagM2Bh2VX2ldniWbPeFY8w=w426-h240-k-no'),
    new Campground('Crystal Creek Campground', 'us26', 6, 6, true, false, 'https://maps.app.goo.gl/wfRmKvVaEnzmbT1Y9?g_st=ac', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEc01gB4-WYN41evdDO7SbtLyMNYLq1OZWYIWHZcWYwgqxx0hM5SNmtZ8wte1hinyH3c6xbGW6BFzJp_KefJcRO9RaM1a6_5ds6jrJKvtOBlcycTJx8nXh_q6D2DOjCIxzvr60Mug=w408-h271-k-no'),
    new Campground('Half Moon Lake Campground', 'us191', 17, 17, true, false, 'https://maps.app.goo.gl/qqdAx9VvQtmK8F2x7', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHl_EFbK8dNOayoxZ2tIrFT23_eSHYoYTgixqUtUsqR-2eTrQFqTZRPgr6tPkiZvZ7Vh65FRshsJujgH5BEFoyrEWLHfLboHTaWvteY_aMfKpSDxukBoIKIYrOJLZnWZNbOgAkZ=w408-h306-k-no'),
    new Campground('New Fork Lake Campground', 'us191', 15, 15, true, false, 'https://maps.app.goo.gl/ZraHc2CjtLKUX7uJ7', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEGXlRwf5srkDAFRwh7BhUjVpo6x_lwMOiu5mBKABXYLCVel-dQyqj-1bQ6FWGs61TRp4xoQ9SGH7fzpGSc2NJQ1pcNxYXblwrNu9ZhubKfsr9qYPft_LeSzviBycSIyJORZIe9Kw=w408-h306-k-no'),
    new Campground('Whiskey Grove Campground', 'us191', 9, 9, true, false, 'https://maps.app.goo.gl/HLaJUdwuDNEqewMi7', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGWUIcaEuhSLYUMUpFZaotf0Ra0s8q-3iFiQGkwSejVENN3duiLS8PJ8zBTS3RwlQ9tmL_zLAZwSnKK_jdprSEs9guhOPWoUEwFadGtai_5yhjFYsHYXdXSObdV1xGLEWJ1ufMTfw=w426-h240-k-no'),
    new Campground('Green River Lake Campground', 'us191', 34, 34, true, false, 'https://maps.app.goo.gl/RuUX99mQr26KUVZb8?g_st=ac', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH_3ydVezJZxVuA2lMPlwaVV-2TJI-MyZsza-c4o3A0zis7jeyr_wq0LL5XDTpVZWQxq6wEKKLbw-wLLaiklndysWnZBkx4ugcUYml7JY6QTRCJLOkiFdto7PBE4iZcnMCGOhNk=w408-h544-k-no'),
    new Campground('Granite Creek Campground', 'us191', 51, 51, true, false, 'https://maps.app.goo.gl/uF9f7Mpm7M28yKSE9', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFQlzrGGVV93txLDJnD6XxyzS5Zj1_qQTpoAtHcCZu41KUj3U9sLIUdZaKq_bAwevtuaVuB-f3hZnDG5JwiIRPIHR8F-uenijoMS9Eer97kf7apVxwPX5mvfb7hIf10aFnLyDa9=w426-h240-k-no'),
    new Campground('Double Cabin Campground', 'us26', 14, 14, true, false, 'https://maps.app.goo.gl/Wnz3iWEPSBFFR3dp6?g_st=ac', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGFUC3YhqoltEKfS4_tMxXlz5dJsw-nP16k9DdC_BPwyLXXkPTGZggg5Te-UjZboBb4If_RL2EpoObODxr_K4TSmjwSLWIgR6y6KwUrLV4erztILo893rsJ6e1pYsn_Snw4YbKVsg=w408-h306-k-no'),
    new Campground('Shoshone National Forest', 'us26', 999, 999, false, false, 'https://maps.app.goo.gl/vAGMQ7oh6oPrpS8s9', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEBWSoXXVzykmtl0bIVvRTcal-qwhljbF6TvEaeDd8CoNhP0ICdY7ggqj6zBkROANHxzsURQT8RyNyXgLffNfIdyvuiqD8osJtoFPVow9gnR57VGP7PacCsqz9PZHfIr9HBtOBi=w408-h273-k-no'),
    new Campground('Brooks Lake Campground', 'us26', 13, 13, true, false, 'https://maps.app.goo.gl/s7qyFEnpfkvEKZGo9?g_st=ac', 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAF0oFu8QytSlhoGDCya8OVbct9NlG8EDSBnNF4YIE29_MJsDc24RzMXqrx07wQOMXjQxBNRihYQm4L2sOrJbVeuoF51Ae8O50dPXFPKlpHakdpzjZbTVjLFa9dvu49l_IuoWKk=w408-h306-k-no')
]
//#endregion ==================================================================================

//#region Define Variables ====================================================================

// Set some filter default values -------------------------------------------------------------
let filterSectorSetting = 'all';
let filterWCSetting = 'all';
let filterWaterSetting = 'all';

// Input Form Element Variables ---------------------------------------------------------------
const inputFormEle = document.getElementById('input-form');
const campgroundNameInputEle = document.getElementById('campground-name-input');
const sectorInputEle = document.getElementById('sector-input');
const sitesTotalInputEle = document.getElementById('sites-total-input');
const sitesFCInputEle = document.getElementById('sites-fc-input');
const hasWCInputEle = document.getElementById('has-wc-input');
const hasWaterInputEle = document.getElementById('has-water-input');
const mapURLInputEle = document.getElementById('map-url-input');
const imageURLInputEle = document.getElementById('image-url-input');
const resultsCountEle = document.getElementById('results-count');

//#endregion ==================================================================================

//#region Render Function =====================================================================

function renderCampgrounds() {

    let count = 0;
    const resultsWindowEle = document.getElementById('results-window');
    resultsWindowEle.innerHTML = '';

    for (let i = 0; i < campgroundsList.length; i++) {

        if ((filterSectorSetting === 'all' || filterSectorSetting === campgroundsList[i].sector) &&
            (filterWCSetting === 'all' || filterWCSetting == String(campgroundsList[i].restrooms)) &&
            (filterWaterSetting === 'all' || filterWaterSetting == String(campgroundsList[i].water))) {

            let thisCampground = new Campground(
                campgroundsList[i].name,
                campgroundsList[i].sector,
                campgroundsList[i].sitesTotal,
                campgroundsList[i].sitesFC,
                campgroundsList[i].restrooms,
                campgroundsList[i].water,
                campgroundsList[i].mapURL,
                campgroundsList[i].imageURL);

            if (thisCampground.restrooms) {
                thisCampground.restrooms = 'bi-badge-wc-fill text-success'
            } else {
                thisCampground.restrooms = 'bi-badge-wc text-black-50'
            };

            if (thisCampground.water) {
                thisCampground.water = 'bi-droplet-fill text-success'
            } else {
                thisCampground.water = 'bi-droplet text-black-50'
            };

            resultsWindowEle.innerHTML += `
            <tr>
            <td class="d-none d-md-table-cell align-middle"><img
                src="${thisCampground.imageURL}" alt="Image of a campground"
                class="thumbnail-image rounded"></td>

            <td class="d-md-table-cell align-middle"><img src="src/images/sector_${thisCampground.sector}.png"
                alt="us191 Sector" class="w-75 img-fluid rounded"></td>

            <td class="fs-responsive align-middle text-start">${thisCampground.name}</td>

            <td class="fs-responsive align-middle d-none d-md-table-cell">${thisCampground.sitesTotal}</td>
            
            <td class="fs-responsive align-middle">${thisCampground.sitesFC}</td>

            <td class="fs-responsive align-middle"><i class="fs-1 bi ${thisCampground.restrooms}"></i></td>
            
            <td class="fs-responsive align-middle"><i class="fs-1 bi ${thisCampground.water}"></i></td>
            
            <td class="fs-responsive align-middle"><a href="${thisCampground.mapURL}"
                target="_blank" aria-label="View on Google Maps">
                <i class="fs-1 bi bi-map-fill"></i></a></td>
            </tr>`

            count++;
        }

        resultsCountEle.textContent = `${count} campsites found`;
    }
}

//#endregion ==================================================================================

//#region Event Listeners =====================================================================

// Submit Form --------------------------------------------------------------------------------

document.getElementById('submit-form').addEventListener('click', function (e) {
    e.preventDefault();
    console.log('user input: submit-form clicked.');

    if (!campgroundNameInputEle.value ||
        !sectorInputEle.value ||
        !sitesTotalInputEle.value ||
        !sitesFCInputEle.value ||
        !mapURLInputEle.value ||
        !imageURLInputEle.value) {
        alert("Please fill out all fields.")

    } else {

        campgroundsList.push(
            new Campground(
                campgroundNameInputEle.value,
                sectorInputEle.value,
                sitesTotalInputEle.value,
                sitesFCInputEle.value,
                hasWCInputEle.checked,
                hasWaterInputEle.checked,
                mapURLInputEle.value,
                imageURLInputEle.value
            ));

        inputFormEle.reset();
        renderCampgrounds();
    }

});

document.getElementById('reset-form').addEventListener('click', function (e) {
    this.reset;
    console.log('user input: reset-form clicked.');
});


// Display Filters ----------------------------------------------------------------------------

document.getElementById('sector-filter').addEventListener('change', function (e) {
    filterSectorSetting = e.target.value;
    renderCampgrounds();
});

document.getElementById('wc-filter').addEventListener('change', function (e) {
    filterWCSetting = e.target.value;
    renderCampgrounds();
});

document.getElementById('water-filter').addEventListener('change', function (e) {
    filterWaterSetting = e.target.value;
    renderCampgrounds();
});

//#endregion ==================================================================================

//#region Runtime let's get started! ==========================================================
console.group("---------- Runtime ----------");

renderCampgrounds();

console.groupEnd();
//#endregion ==================================================================================
