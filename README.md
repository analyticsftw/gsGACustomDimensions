# gsGACustomDimensions
A Google Script / Google Sheets project to download/upload custom dimensions from/to the Google Analytics Management API.

* Installation
	* Copy the code in Code.gs file
	* Create a new Google Sheet, with two tabs labeled `Settings` and `Data`
	* In the `Settings` tab, insert your GA Property ID (`UA-123456-1`) in cell `B2` and the GA Account ID (`123456`)
	* Navigate to `Tools` > `Script Editor`
	* Paste the code. Save.
	* From the Script Editor, go to `Resources` > `Advanced Google Services`, search for the Google Analytics API and enable it.
* Usage
	* A menu labeled `Custom Dimension Management` should be available upon opening the sheet
	* From the menu, select either `Download Custom Dimensions` or `Upload Custom Dimensions`
	* `Download Custom Dimensions` will... download the custom dimension definition into the `Data`tab
	* `Upload Custom Dimensions` will upload (insert) the custom dimension definition in the `Data`tab up to the Google Analytics property ID defined in the `Settings`tab
	* If the menu is not available, you can run the `getCustomDims()` or `setCustomDims()` functions directly from the Script Editor.

* Pre-requisites:
	* Google Analytics property 
	* Google Sheet with access granted to Google Analytics API
    
* Reference:
	* Google Analytics Management API (v3)
	* [Example Google Sheet](https://docs.google.com/spreadsheets/d/1yEv78ijqMPo49dLdG42UYnhByluNALLLVPwoOJEE6OM/edit?usp=sharing)

* TODO:
	* Add account/property selection dialog
	* Option to prefill property with placeholder dimensions
	* Option to update and not insert
