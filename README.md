# Project: HashMap

from [The Odin Project](https://theodinproject.com)

# Description

A Hash Map is a data structure in which we "hash" a key into a number that
represents the index of an array in which to insert it at. We specify a certain
amount of "buckets" in which we put pieces of data into. Ideally, data is spread
evenly so it is quick to retrieve data given a key. If there is more than one
piece of data in a bucket, it is in a Linked List form.

In this project, we expand the number of buckets by 2 when we reach a certain
load factor, which is 75% of the number of buckets. Once we reach that
threshold, then we double the amount of buckets and rehash all of the keys so
the data is spread evenly once again.
