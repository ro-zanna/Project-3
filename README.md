# Electric Cars


# This Project was made by  Lwam Mehare , Telmen Erdenebat, Rosanna Chiu.


As we become increasingly conscious of the environmental impact of transportation, electric cars have emerged as a potential solution to reduce carbon emissions and promote sustainability. However, the adoption of electric cars is still limited due to various factors, including high prices, limited range, and lack of charging infrastructure. To promote the wider adoption of electric cars, it is essential to understand the current state of the electric car market on a local as well as global scale, and identify value propositions for potential consumers, as well as ease of use around owning and maintaining an electric vehicle. 


For this project, we focused on three areas of data exploration:
- EV cars available on the market in 2023 and compared the range, speed, battery charging efficiency, and affordability for various manufacturers and models
- A map of publicly available EV charging stations in California and key cities in CA for the majority of our presentation audience 
- A global trend analysis for EV sales and oil displacement/gas conservation over the last decade, with year by year overview for various regions


For EV car analysis, we loaded a Kaggle CSV dataset (scraped data originating from https://ev-database.org/) into a Jupyter notebook and used Python to clean the data and create charts. 


For the map of EV charging stations, we used Leaflet in Javascript to create an interactive visualization with data from https://afdc.energy.gov/, producing a map with a search field for cities and markers showing the charging stations.


For the global EV data explorer, we downloaded EV sales and oil displacement data in CSV files from https://www.iea.org/, converted them into a JSON file to create an interactive dashboard using Javascript and Plotly for multiple charts to update using dropdown menu.


As part of the project requirements, we created a Python Flask-powered API using SQLAlchemy that served global EV sales and oil displacement data from Postgres to the dashboard. We also created a script that loaded the global EV CSV data files and USA charging station JSON data into Postgres via Python. However, using this would have required hosting an API outside of Github Pages for the interactive Javascript dashboard to load properly, so we kept the Flask API/Postgres database separate and ran the dashboard from JSON files for demo purposes.


Slide deck: https://bit.ly/3IN4m9W
