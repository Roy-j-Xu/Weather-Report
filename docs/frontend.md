# Frontend

A frontend created with Typescript. Currently under development.

## Architecture

The frontend currently follows a MV architecture. It has become troublesome to maintain, and needs to be refactored. 

The following shows the current structure for the city searching page. One way to improve the structure is to separate a `CityTableState` object out of the system, resulting in something close to MV* architecture. I am currently doing researches on other options.

![frontendStructure](diagrams/city_table_structure.drawio.png)