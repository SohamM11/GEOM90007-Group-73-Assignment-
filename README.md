# GEOM90007-Group-73-Assignment-Details
# SUBMITION 24 October 2021, 23:59 pm

Task

In the age of big and open data, it is important to be able to sort through many different datasets, organise them for a specific purpose and decide on a final visualisation based on many contextual factors, such as target audience or purpose.

For Assignment 3, we will work with a large dataset with various themes of information about the City of Melbourne local government area.

Your task is to pick a target audience and create an interactive online (HTML) visualisation/interface that will be tailored for one of the following user groups. Your interface should be intuitive and easy to use, carefully designed, and help the users to discover interesting and practical information about Melbourne, or help the government agency identify interesting patterns in the data or make decisions for specific tasks.

You will develop an HTML page that could include embedded Tableau data graphics, Chart.js charts or Mapbox maps, or for a technical challenge, you could employ any other web-based visualisation libraries/tools of your selection. 

The process will include data selection and formatting, some descriptive statistics and data analyses, and designing the final visualisation with the information hierarchy in mind (UX/UI) – not to forget a final testing phase.

 

Your group needs to select one of the following user groups:

    Tourists that would like to/are visiting Melbourne (hint: useful layer is e.g. POIs (Point of Interests))
    Local citizens that commute to the CBD (useful layers: public transport networks)
    A state government department that is interested in the performance of any of public transport, Metro Tunnel, vehicle volume, pedestrian counts… (not limited to transport)
    If you would like to target a different user group, please speak with Davood.

Tip: not all datasets are useful for every audience, so be mindful about potential information overload. For example, turning on and off layers can help with this.

The key questions to ask include (but are not limited to): Where and when will individual users use the interactive visualisation? What places are most frequented/popular? What patterns can be found? Are there any anomalies or specifics of any particular location/type of data? What platform should be used (web, mobile, kiosk, etc)?

 

Submission

You need to make two (2) submissions as a group.

    Implementation and Report (Commented Code + PDF Report)
    Video

 

A. Implementation and Report (Commented Code + PDF Report)

One group member must submit two files into this assignment by the stated deadline:

    A single ZIP file containing your commented code and any required data. There must be an HTML file called index.html which the marker will view. You can include any other CSS, JavaScript, etc files that are needed.
    A PDF report that contains the following sections:
        a design summary (maximum 2 pages) explaining what your interface does, how it works, what features of the design you would like to receive credit for, and a justification of the design decisions made (e.g. why a particular color scheme is used, or why a particular graph is the best visualisation of the underlying data);
        a summary (maximum 2 pages) showcasing some of the interesting or useful patterns or information that the interface helps you discover (standing in the shoes of the target user group(s)), and a short rationale as to why your tool helped in those discoveries or use cases.
        Tip: the rationale may link with the design decisions mentioned above.  Also, the best summaries will make links back to the lecture materials or additional readings.  

 

B. Video

See the other assignment.

 

Assessment

This exercise is to be completed in groups of five. 

The assessment is worth 35% of your final subject mark. This assessment will comprise a report of your developed tool (25% of your assignment mark) and a recorded video of your work including a demonstration of the developed tool (10% of your assignment mark).

The rubric for the tool, video and reports can be found below.

 

Datasets

The following is a list of suggested layers and tables. You can download them here Download download them here as a geodatabase (.gdb) - extract the folder from the .zip file without changing the folder name.

 
|Data theme| 	Data source| 	License|
|----------|:-----------:|:-------:|
BusMetroRoutes 	DELWP 	CC BY 4.0
BusRegionalRoutes 	DELWP 	CC BY 4.0
CityActivitiesAndPlannedWorks 	City of Melbourne 	CC BY 4.0
Melbourne_Bicycle_Routes_MGA 	City of Melbourne 	CC BY 4.0
Melbourne_Building_Footprints_MGA 	City of Melbourne 	CC BY 4.0
Melbourne_CityCircle_tram_MGA 	City of Melbourne 	CC BY 4.0
Melbourne_Municipal_Boundary 	City of Melbourne 	CC BY 4.0
Melbourne_OpenSpace 	DELWP 	CC BY 4.0
Melbourne_POIs 	City of Melbourne 	CC BY 4.0
Melbourne_Roads 	City of Melbourne 	CC BY 4.0
Melbourne_Street_Names_MGA 	City of Melbourne 	CC BY 4.0
Melbourne_Tram_Routes_MGA 	DELWP 	CC BY 4.0
mtp_ees_future_stn_entrances (Metro Tunnel) 	DELWP 	CC BY 4.0
mtp_ees_station_entrances (Metro Tunnel) 	DELWP 	CC BY 4.0
mtp_ees_tunnel_entrances (Metro Tunnel) 	DELWP 	CC BY 4.0
mtp_ees_underground_rail_track (Metro Tunnel) 	DELWP 	CC BY 4.0
Road_Use_Hierarchy 	DELWP 	CC BY 4.0
SuperSundayBikeCount 	City of Melbourne 	CC BY 4.0
TaxiRank 	City of Melbourne 	CC BY 4.0
trainCorridorCentreline 	DELWP 	CC BY 4.0
trainStations 	DELWP 	CC BY 4.0

 

You may find the following data useful as well:

Melbourne Metro Trains Cordon Station Average Load by Service - October 2013 - data.xlsx Download Melbourne Metro Trains Cordon Station Average Load by Service - October 2013 - data.xlsx

Train Station Entries 2008-09 to 2011-12 - data.xls Download Train Station Entries 2008-09 to 2011-12 - data.xls

 

Tip: You will start with exploring and analysing given datasets in Tableau or a GIS package (ArcMap or QGIS). You will then have a choice to export your chosen datasets into other formats (GeoJSON or Shapefiles) if required. These types of files can then be uploaded into Mapbox Studio, Tableau, or etc. 

You are encouraged to search for additional datasets. We can recommend:

    City of Melbourne – Open Data Portal https://data.melbourne.vic.gov.au/ (Links to an external site.).
    Victorian Government open data https://data.vic.gov.au/ (Links to an external site.)
    A good GIS source directory can be found at the University of Melbourne Library: Australian GIS data guide: http://unimelb.libguides.com/GIS (Links to an external site.)

You may select a subset of data from the provided dataset if it is appropriate to your design. You may also find and use further data sets as appropriate (e.g., weather data, etc). 

 

Important dates

You must submit the two parts of the project by 24 October 2021, 23:59 pm.

No late submissions will be accepted. This means submissions after the stated deadline will not be marked and will receive a mark of zero.

 

Assessment criteria

The key assessment criteria for the submitted code and Reports are:

    Submission: The submission is in the correct formats, all data and files are present, and submission accords with other instructions above; the code works when run on the marker's machine without further editing; the submission contains any and all necessary data and files; and conforms with all the submission criteria. 
    Design: The interface and supporting documentation conforms to basic graphical/map/interface design principles; and are well-presented with evidence of care and attention to detail. 
    Technical challenge: The interface relies on new or different programming techniques not encountered in class or previous assessments; has particularly compact, well-structured, or well-presented code; and/or demonstrates clear evidence of advanced and independent work.  
    Design innovation: The online interface involves design elements that are innovative; reveals interesting or meaningful patterns; is notably aesthetically pleasing or striking; demonstrates independent background research into the research literature; and/or existing demonstrates clear evidence of original thinking and advanced understanding of map, interface, and graphical design principles.  

As a guide to grade-related criteria: 

    <50%: Inadequate work that in one or more respects fails to meet basic technical standards or apply basic design principles.
    50-60%: Satisfactory work that is a correctly submitted basic interface to the data.
    60-70%: Good work that involves marginal additional technical challenge or marginal design innovation, and moderate levels of design quality. 
    70-80%: Excellent work that involves clear additional technical challenge and additional design innovation and high levels of design quality. 
    >80%: Outstanding work that demonstrates substantial additional technical challenge, substantial design innovation, flawless design, and involves work that clearly goes beyond that normally expected in class.  

 

Hints

    You should plan accurately to submit on time.
    Try to be creative and innovate.
    You should think carefully about any visual aid you use in your tool and video.
    When recording the video and presenting interface functionality, perhaps you can use PowerPoint slides and interface to demonstrate different aspects of the tool.
    Spelling and grammar are part of the assessment. Your video, visual aid, code commenting, and associated documentation should exhibit attention to detail, and should be free of errors.
    Including an interesting infographic in your interface can earn you extra points!
    In your design summary you should highlight the design rationale and design choices for your interface.
    In your report, you should provide some information on how to use your interface.
    In your report, you should highlight the most important information that is being presented in your interface, explaining how each features of your interface assist in learning about Melbourne for your chosen audience/map user.

 

Plagiarism

Plagiarism is copying and use of another's work without proper acknowledgment. The university has a clear policy prohibiting any form of plagiarism. Further information can be found at: http://www.services.unimelb.edu.au/plagiarism/Links to an external site.. 

Note that it is acceptable to reuse ideas and code you have found on the web as long as the source is clearly acknowledged, and that use is permitted by any license restrictions. If properly acknowledged, using other people's code and ideas can count as independent background research (see grade related criteria above). If not properly acknowledged, using other people's code and ideas is plagiarism and will result in a mark of zero for this assessment. In serious cases plagiarism may also result in failure of the entire subject and further University disciplinary action.

In short: you must clearly acknowledge any material you have used in your assessment. 

Coda

This exercise was originally developed by Matt Duckham, modified by Katerina Pavkova, under Creative Commons Attribution 3.0 Unported License.
