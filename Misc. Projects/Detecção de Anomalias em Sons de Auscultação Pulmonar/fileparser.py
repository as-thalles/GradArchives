import glob, os  # Diretórios
import csv


# Gets all file names from a directory (extension may or may not be specified)
def get_filenames(path, filetype=None):
    files = []
    if path[-1] != '/':
        path += '/'
    os.chdir(path=path)
    if filetype is None:
        for file in glob.glob('*'):
            files.append(file)
    else:
        for file in glob.glob('*'+filetype):
            files.append(file)
    return sorted(files)
    pass


def write_csv(filename, list, raw=True):
    if filename[-4:] != '.csv':
        filename += '.csv'
    with open(filename, 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for row in list:

            writer.writerow(row)
