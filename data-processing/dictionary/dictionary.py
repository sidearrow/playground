import json
import sys
import resource

sys.setrecursionlimit(10000)

class Node:
    def __init__(self, val, children=[], is_end=True):
        self.val = val
        self.children = children
        self.is_end = is_end

    def insert(self, target_val):
        if len(target_val) == 0:
            return

        target_val_len = len(target_val)
        self_val_len = len(self.val)

        diff_idx = -1
        comp_num = min(target_val_len, self_val_len)
        for i in range(comp_num):
            if target_val[i] != self.val[i]:
                diff_idx = i
                break

        if diff_idx != -1:
            self.__split(target_val, diff_idx)
            return

        if target_val_len == self_val_len:
            self.is_end = True
            return

        if self_val_len > target_val_len:
            self.__split(target_val, target_val_len - 1)
            return

        new_target_val = target_val[comp_num:]

        print([len(self.children), self.val])
        for node in self.children:
            print([self.val, new_target_val, node.val])
            if node.val[0] == new_target_val[0]:
                node.insert(new_target_val)
                return

        self.children.append(Node(new_target_val))

    def __split(self, target_val, idx):
        node_child1 = Node(self.val[idx:], children=self.children)
        node_child2 = Node(target_val[idx:])

        self.val = self.val[:idx]
        self.is_end = False

        if node_child1.val > node_child2.val:
            node_child1, node_child2 = node_child2, node_child1
        self.children.append(node_child1)
        self.children.append(node_child2)


class Tree:
    def __init__(self):
        self.root_node = Node('')
        self.raw = [None, []]

    def insert(self, val):
        if len(val) == 0:
            return
        self.root_node.insert(val)

    def dump_to_json(self):
        self.__insert_node_to_raw(self.raw, self.root_node)
        f = open('dictionary.json', mode='w')
        ff = open('dictionary_format.json', mode='w')
        json.dump(self.raw, f, ensure_ascii=False)
        json.dump(self.raw, ff, indent=2, ensure_ascii=False)

    def __insert_node_to_raw(self, parent, node):
        if parent[1] == None:
            parent[1] = []
        parent[1].append([node.val, None])
        for child_node in node.children:
            self.__insert_node_to_raw(parent[1][-1], child_node)
