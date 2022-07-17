#Outside imports
import pandas as pd
from dotenv import load_dotenv
import seaborn as sns
import matplotlib.pyplot as plt

#System level imports
import os
from datetime import datetime

#Helper function the get driver dataframes 
    #Parameters:
        #name: The name of the driver. Format is firts name and last name (e.g. "Lewis Hamilton")
        #tag: The tag of the driver. Format is the tag of the driver (e.g. "HAM"). Optional arguement.
    #Returns:
        #Dataframe corresponding to the driver.
def get_driver_df(name, tag):
    load_dotenv()
    #Get the path to the main file
    main_path = os.getenv("CSV_PATH")
    driver_name = name.lower().replace(" ", "_")
    file_path = main_path + "/driver_data/{}_data.csv".format(driver_name)
    #Check if the file exists
    try:
        if not os.path.exists(file_path):
        #Try out the tag if csv for name doesn't exist
            print(main_path)
            print(file_path)
            all_drivers = pd.read_csv(main_path + "driver_data/f1_driver_data.csv")
            print("Here 1")
            driver_name = all_drivers[all_drivers["Abbreviation"] == tag].iloc[0]["FullName"]
            file_path = main_path + "driver_data.{}.csv".format(driver_name)
        data = pd.read_csv(file_path)
        data = data.drop(columns = data.columns[0])
        return data
    except:
        print(print("An error has occured finding the driver experience. Please make sure the name is in the right format (FirstName, LastName, eg. Lewis Hamilton). You can provide tag as a keyword aarguement as well."))



#Returns how long the driver has been in formula 1 for. 
    #Parameters:
        #name: The name of the driver. Format is firts name and last name (e.g. "Lewis Hamilton")
        #tag: The tag of the driver. Format is the tag of the driver (e.g. "HAM"). Optional arguement.
    #Returns:
        #Tuple containing length in compact format. Format is (time in F1, number of GP's attended)
def get_driver_experience(name, tag = None):
#Load the dotenv file, and save the cwd
    load_dotenv()
    data = get_driver_df(name, tag)
    first_year = data.iloc[0]["Date"]
    last_year = data.iloc[data.shape[0]-1]["Date"]
    first_year, last_year = datetime.strptime(first_year, '%Y-%m-%d'), datetime.strptime(last_year, '%Y-%m-%d')
    diff = last_year - first_year
    #The return does not account for leap years and so on, might be slighly off.
    days = diff.days
    gp_attended = data.shape[0]
    return days, gp_attended

#Returns how long the driver has been in formula 1 for. 
    #Parameters:
        #name: The name of the driver. Format is firts name and last name (e.g. "Lewis Hamilton")
        #tag: The tag of the driver. Format is the tag of the driver (e.g. "HAM"). Optional arguement.
    #Returns:
        #Dictionary containing team names mapping to arrays of first and last years. (e.g {Max Verstappen= {Toro Rosso : [2015, 2016], Red Bull : [2016, 2022]})
def check_driver_teams(name, tag = None):
     #Load the dotenv file, and save the cwd
    load_dotenv()
    curr = os.getcwd()
    #Get the path to the main file
    data = get_driver_df(name, tag)
    teams = getTeamsGrouped(data)
    return teams

#Returns how long the driver has been in formula 1 for. 
    #Parameters:
        #name: The name of the driver. Format is firts name and last name (e.g. "Lewis Hamilton")
        #per: The name of the parameter you want the data in. Available arguements are "all", "track", "season", "team".
            #For each information, input it the following way: Track - capitilaize the first letter of the track (e.g. "Melbourne"). Season - input the season (e.g. "2019"). Team - input the team name, with sapce each name capitlized (e.g. "Red Bull").
        #type: The type of data you want. Available arguements are "podiums", "wins", "points".
    #Returns:
        #Depends on per and type. Some examples are:
            #per = "all" and type = "wins":  Number of wins in all seasons, all tracks.
            #per= "track" and type = "wins": Number of wins in the track.
            #per = "season" and type = "podiums": Number of wins in the season on that track (repetitive, can only be one win).
            #per = "team" and type = "podiums": Number of podiums in different teams. Format is {Max Verstappen= {Toro Rosso : 0, Red Bull : 67 } - number of podiums might be more for Max now.
def win_data(name, per = "all", type = "wins", track = None, season = None):
    try:
        data = get_driver_df(name, None)
    except:
        print("Couldn't find the driver data.")
        return ValueError("An error has occured finding the driver experience.")
    if per == "all":
        return get_relevant(data, type)
    elif per == "track":
        track_data = get_track(data, track)
        return get_relevant(track_data, type)
    elif per == "season":
        season_data = get_season(data, season)
        return get_relevant(season_data, type)
    elif per == "team":
        teams = {}
        #Custom team code - get the teams grouped by the driver
        for team in data["TeamName"].unique():
            relevant_team = data[data["TeamName"] == team]
            relevant_data = get_relevant(relevant_team, type)
            teams[team] = relevant_data
        return teams
    else:
        print("Not a valid per field - please look into documentation before trying again.")

#Helpers for win_data:
def get_track(df, track):
    return df[df["Race"] == track]

def get_season(df, season):
    return df[df["Year"] == season]


def getTeamsGrouped(df):
    teams = {}
    for team in df["TeamName"].unique():
        relevant_team = df[df["TeamName"] == team].sort_values(by = "Year", ascending = False)
        first_year, last_year = relevant_team.iloc[relevant_team.shape[0]-1]["Year"], relevant_team.iloc[0]["Year"]
        teams[team] = [first_year, last_year]
    return teams

def get_relevant(df, type):
    if type == None:
        print("An error has occured - make sure you have entered the relevant field for your data.")
        return Exception("Exception - no valid field entered")
    if type == "podiums":
        print(df)
        return df["Position"].apply(lambda x: x < 4 and x !=0 ).sum()
    elif type == "wins":
        return df["Position"].apply(lambda x: x == 1).sum()
    elif type == "points":
        return df["Points"].sum()
    else:
        return ValueError("Invalid type")


#Returns a graph of the drivers start positions vs the end positions (a bar chart).
    #Parameters:
        #name: The name of the driver. Format is firts name and last name (e.g. "Lewis Hamilton")
        #per: The type of event you want. Can be "S" for sprint or "R" for "race". "Q" is not supported, (duh). "all" gives both race and sprint.
    #Returns:
        #Bar chart of start positions vs end positions, overlapped.
    #Disclaimer: Grid position data has problems at the moment - if there is a penalty after the sprint race, we do not detec that!
def graph_start_end(driver, per = "all"):
    try:
        driver_data = get_driver_df(driver, None)
    except:
        print("Couldn't find the driver data.")
        return ValueError("An error has occured finding the driver experience.")
    if per == "all":
        driver_data = driver_data
    else:
        driver_data = driver_data[driver_data["Type"] == per]
    starts = driver_data["GridPosition"].value_counts()
    starts.index = starts.index.astype(int)
    ends = driver_data["Position"].value_counts()
    ends.index = ends.index.astype(int)
    starts_df = pd.DataFrame(starts).reset_index().rename({"index":"Count", "GridPosition":"Position"}, axis =1)
    starts_df["Type"] = "Start"
    ends_df = pd.DataFrame(ends).reset_index().rename({"index":"Count"}, axis =1)
    ends_df["Type"] = "End"
    df = pd.concat([starts_df, ends_df])
    sns.barplot(x='Count', y='Position', hue='Type', data=df) 
    plt.xlabel("Position")
    plt.ylabel("Count")
    plt.title("Start Position vs End Position in a GP for {}".format(driver))
    plt.show()
    print("Disclaimer: Grid position data has problems at the moment - if there is a penalty after the sprint race, we do not detec that!")

def get_driver_number(name, tag = None):
    df = get_driver_df(name, tag)
    return df['Abbreviation'].iloc[0]

#gETS
def get_not_finished(name, tag= None):
    df = get_driver_df(name, tag)
    not_finished = df.loc[df["Status"] != "Finished"]
    truth_table =not_finished[~not_finished["Status"].str.contains("Lap")]
    return not_finished.loc[truth_table.index]
#Test the code

def get_driver_number(name, tag = None):
    df = get_driver_df(name, tag)
    driver_numbers = df['DriverNumber'].unique()
    print(driver_numbers)
    mapping = {}
    for number in driver_numbers:
        number_df = df[df["DriverNumber"] == number]["Year"]
        years = number_df.unique()
        maximum, minimum = max(years) , min(years)
        mapping[number] = [minimum, maximum]
    return mapping


print(get_driver_number("Max Verstappen"))