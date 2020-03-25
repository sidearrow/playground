from typing import List

class Node:
    val: str
    children: List[int]
    is_end: bool

    def __init__(self, val):
        self.val = val
        self.children = []
        self.is_end = True


class Tree:
    node_list: List[Node] = []
    ROOT_IDX = 0

    def __init__(self):
        self.node_list.append(Node('aaa'))

    def insert(self, val, idx=0):
        diff_idx = -1
        comp_num = min(len(val), len(self.node_list[idx].val))
        for i in range(comp_num):
            if val[i] != self.node_list[idx].val[i]:
                diff_idx = i
                break

        if diff_idx != -1:
            val_parent = self.node_list[idx].val[:diff_idx]
            val_child1 = self.node_list[idx].val[diff_idx:]
            val_child2 = val[diff_idx:]

            if val_child1 > val_child2:
                val_child1, val_child2 = val_child2, val_child1

            self.node_list[idx].val = val_parent
            self.node_list[idx].children.append(Node(val_child1))
            self.node_list[idx].children.append(Node(val_child2))
            return

    def dump_to_json(self):
        arr = []
        for node in self.node_list:
            val = node.val if node.is_end else node.val + '$'
            if len(node.children) == 0:
                arr.append([node.val])
            else:
                arr.append([node.val])


tree = Tree()
tree.insert('aab')
