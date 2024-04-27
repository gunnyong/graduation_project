import os
import json

dataset_dir = 'aidata/dataset_train'
output_path = 'aidata/image_counts.json'

def count_images_in_directories(dataset_dir):
    directory_counts = {}
    for root, dirs, files in os.walk(dataset_dir):
        if files:
            directory_name = os.path.basename(root)
            file_count = len(files)
            directory_counts[directory_name] = file_count
    return directory_counts

def save_counts_to_json(counts, output_path):
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(counts, f, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    image_counts = count_images_in_directories(dataset_dir)
    save_counts_to_json(image_counts, output_path)