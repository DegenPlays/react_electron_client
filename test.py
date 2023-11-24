import os
import json

def rename_folders(base_path):
    # Get the list of subdirectories in the "modules" folder
    modules_path = os.path.join(base_path, "modules")
    subdirectories = [d for d in os.listdir(modules_path) if os.path.isdir(os.path.join(modules_path, d))]

    # Process each subdirectory
    for folder_name in subdirectories:
        folder_path = os.path.join(modules_path, folder_name)

        # Open the "modules.json" file within each folder
        modules_file_path = os.path.join(folder_path, "module.json")
        if os.path.exists(modules_file_path):
            name_value = ''
            with open(modules_file_path, 'r') as modules_file:
                try:
                    # Load JSON data and get the value of the "name" field
                    data = json.load(modules_file)
                    name_value = data.get("name")

                except json.JSONDecodeError:
                    print(f'Error decoding JSON in {modules_file_path}')
            try:
                # Rename the folder to the value of the "name" field
                if name_value != '':
                    new_folder_path = os.path.join(modules_path, name_value)
                    os.rename(folder_path, new_folder_path)
                    print(f'Renamed folder: {folder_name} to {name_value}')
                else:
                    print(f'Warning: No "name" field in {modules_file_path}')
            except json.JSONDecodeError:
                print(f'Error renaming file {folder_name}')

if __name__ == "__main__":
    base_directory = "g:/cleaning"  # Replace with the actual base directory path
    rename_folders(base_directory)