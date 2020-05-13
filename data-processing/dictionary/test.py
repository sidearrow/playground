from dictionary import Tree, Node
from memory_profiler import profile


def insert_same():
    n = Node('a')
    n.insert('a')

    assert n.val == 'a'
    assert len(n.children) == 0
    assert n.is_end


def insert_partial_match_long():
    n = Node('a')
    n.insert('ab')

    assert n.val == 'a'
    assert len(n.children) == 1
    assert n.is_end
    assert n.children[0].val == 'b'
    assert len(n.children[0].children) == 0
    assert n.children[0].is_end


def insert_partial_match_longlong():
    n = Node('ab')
    n.insert('abc')
    n.insert('ac')

    assert n.val == 'a'
    assert n.children[0].val == 'c'
    assert n.children[1].val == 'b'
    assert n.children[1].children[0].val == 'c'


@profile
def output():
    lines = open('stations.csv')
    t = Tree()
    for line in lines:
        t.insert(line.strip())
    '''
    try:
        t = Tree()
        for line in lines:
            t.insert(line.strip())
    finally:
        t.dump_to_json()
    '''


# insert_same()
# insert_partial_match_long()
# insert_partial_match_longlong()
output()
