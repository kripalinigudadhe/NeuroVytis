import csv
import random
import math
import json

# -----------------------------
# LOAD DATASET
# -----------------------------
def load_csv(filename):
    dataset = []
    with open(filename, 'r') as file:
        csv_reader = csv.reader(file)
        next(csv_reader)
        for row in csv_reader:
            dataset.append([float(x) for x in row])
    return dataset

# -----------------------------
# SPLIT DATA
# -----------------------------
def train_test_split(dataset, split=0.8):
    random.shuffle(dataset)
    train_size = int(len(dataset) * split)
    return dataset[:train_size], dataset[train_size:]

# -----------------------------
# GINI INDEX (OPTIMIZED)
# -----------------------------
def gini_index(groups, classes):
    total = sum(len(group) for group in groups)
    gini = 0.0

    for group in groups:
        size = len(group)
        if size == 0:
            continue

        score = 0.0
        labels = [row[-1] for row in group]

        for class_val in classes:
            p = labels.count(class_val) / size
            score += p * p

        gini += (1 - score) * (size / total)

    return gini

# -----------------------------
# SPLIT DATASET
# -----------------------------
def test_split(index, value, dataset):
    left, right = [], []
    for row in dataset:
        if row[index] < value:
            left.append(row)
        else:
            right.append(row)
    return left, right

# -----------------------------
# FIND BEST SPLIT (OPTIMIZED)
# -----------------------------
def get_split(dataset, n_features):
    class_values = list(set(row[-1] for row in dataset))
    b_index, b_value, b_score, b_groups = None, None, float("inf"), None

    features = random.sample(range(len(dataset[0]) - 1), n_features)

    for index in features:
        # sample only some rows (huge speed gain)
        for row in random.sample(dataset, min(20, len(dataset))):
            groups = test_split(index, row[index], dataset)
            gini = gini_index(groups, class_values)

            if gini < b_score:
                b_index, b_value, b_score, b_groups = index, row[index], gini, groups

    return {'index': b_index, 'value': b_value, 'groups': b_groups}

# -----------------------------
# CREATE LEAF NODE
# -----------------------------
def to_terminal(group):
    outcomes = [row[-1] for row in group]
    return max(set(outcomes), key=outcomes.count)

# -----------------------------
# BUILD TREE
# -----------------------------
def split(node, max_depth, min_size, depth, n_features):
    left, right = node['groups']
    del(node['groups'])

    if not left or not right:
        node['left'] = node['right'] = to_terminal(left + right)
        return

    if depth >= max_depth:
        node['left'], node['right'] = to_terminal(left), to_terminal(right)
        return

    if len(left) <= min_size:
        node['left'] = to_terminal(left)
    else:
        node['left'] = get_split(left, n_features)
        split(node['left'], max_depth, min_size, depth+1, n_features)

    if len(right) <= min_size:
        node['right'] = to_terminal(right)
    else:
        node['right'] = get_split(right, n_features)
        split(node['right'], max_depth, min_size, depth+1, n_features)

# -----------------------------
# BUILD TREE
# -----------------------------
def build_tree(train, max_depth, min_size, n_features):
    root = get_split(train, n_features)
    split(root, max_depth, min_size, 1, n_features)
    return root

# -----------------------------
# PREDICT
# -----------------------------
def predict(node, row):
    if row[node['index']] < node['value']:
        return predict(node['left'], row) if isinstance(node['left'], dict) else node['left']
    else:
        return predict(node['right'], row) if isinstance(node['right'], dict) else node['right']

# -----------------------------
# RANDOM FOREST
# -----------------------------
def random_forest(train, test, n_trees, max_depth, min_size):
    trees = []
    n_features = int(math.sqrt(len(train[0]) - 1))  # important optimization

    for i in range(n_trees):
        print(f"🌳 Building tree {i+1}/{n_trees}")
        sample = random.choices(train, k=len(train))
        tree = build_tree(sample, max_depth, min_size, n_features)
        trees.append(tree)

    predictions = []
    for row in test:
        tree_preds = [predict(tree, row) for tree in trees]
        predictions.append(max(set(tree_preds), key=tree_preds.count))

    return predictions

# -----------------------------
# ACCURACY
# -----------------------------
def accuracy(actual, predicted):
    correct = sum(1 for i in range(len(actual)) if actual[i] == predicted[i])
    return correct / len(actual) * 100
import json

def save_model(trees, filename="model.json"):
    with open(filename, "w") as f:
        json.dump(trees, f)
# -----------------------------
# MAIN
# -----------------------------
# -----------------------------
# MAIN
# -----------------------------
dataset = load_csv("dataset.csv")

train, test = train_test_split(dataset, 0.8)

# BUILD TREES (ONLY ONCE)
trees = []
n_features = int(math.sqrt(len(train[0]) - 1))

for i in range(5):
    print(f"🌳 Building tree {i+1}/5")
    sample = random.choices(train, k=len(train))
    tree = build_tree(sample, max_depth=6, min_size=10, n_features=n_features)
    trees.append(tree)

# SAVE MODEL
save_model(trees)

print("✅ Model saved successfully!")

# TEST MODEL
def forest_predict(trees, row):
    preds = [predict(tree, row) for tree in trees]
    return max(set(preds), key=preds.count)

actual = [row[-1] for row in test]
predicted = [forest_predict(trees, row) for row in test]

acc = accuracy(actual, predicted)

print("✅ Accuracy:", round(acc, 2), "%")