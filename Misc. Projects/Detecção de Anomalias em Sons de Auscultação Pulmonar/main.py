import fileparser as fp
import feature_extract as fe


base_a = '/home/thalles_al/Dropbox/Current Semester/SI/Bases/Base C/training-a'
base_b = '/home/thalles_al/Dropbox/Current Semester/SI/Bases/Base C/training-b'
base_c = '/home/thalles_al/Dropbox/Current Semester/SI/Bases/Base C/training-c'
base_d = '/home/thalles_al/Dropbox/Current Semester/SI/Bases/Base C/training-d'
base_e = '/home/thalles_al/Dropbox/Current Semester/SI/Bases/Base C/training-e'
base_f = '/home/thalles_al/Dropbox/Current Semester/SI/Bases/Base C/training-f'
path = '/home/thalles_al/Dropbox/Current Semester/SI/Bases/Base C/'
dbases = [base_a, base_b, base_c, base_d, base_e, base_f]


def main():
    # Get files and labels
    files = []
    labels= []
    for base in dbases:
        instances = []
        files.append(fp.get_filenames(path=base, filetype='.wav'))
        labels.append(fp.get_filenames(path=base, filetype='.hea'))
        for i in range(len(files[-1])):
            features = fe.extract_feature(base + '/' + files[-1][i])
            label_object = open(base + '/' + labels[-1][i], 'r')
            label = label_object.read().split('\n')[-2]
            features.append(label)
            instances.append(features)
        fp.write_csv(path+base[-1], instances)
        print('Done with: ' + base)
    pass


def clear_files(filename):
    with open(filename, mode='r') as file:
        data = file.readlines()
        wholedata = []
        for line in data:
            wholedata += list(
                    filter(None, str.join(',', list(
                        filter(None, line.split(' '))
                    )
                                          )
                           .replace('"', '')
                           .replace('[', '')
                           .replace(']', '')
                           .replace('\n', '')
                           .replace('#', '')
                           .split(',')))
        minlist = []
        wholist = []
        for i in range(len(wholedata)):
            minlist.append(wholedata[i])
            if wholedata[i] == 'Normal' or wholedata[i] == 'Abnormal':
                wholist.append(minlist)
                minlist = []
        print(wholist)
        print(len(wholist))
        fp.write_csv(filename+'_1', wholist)
    pass


if __name__ == '__main__':
    # main()
    clear_files(path+'f')
    pass
