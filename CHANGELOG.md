# Change Log

## [1.2.0]

### Added

* Changelog

### Changed

* Fixed an issue with table aliases growing too long. The QueryBuilder now generates a hash for any tables that are joined during query resolution. See [The Gitlab Issue](https://gitlab.com/Mando75/typeorm-graphql-loader/-/issues/7) for more details. Thanks to Kees van Lierop and Roemer Bakker for the fix. 

* The loader now uses the entity metadata to query the primary key column for each relation joined, regardless of whether the field was queried. This is to ensure that custom resolvers can access the parent object with at least the primary key. This renders the `primaryKeyColumn` option in `LoaderOptions` obsolete.

### Deprecated

* `primaryKeyColumn` field in `LoaderOptions`. See changes for reasoning.


## [1.1.1]

### Fixed

* Issue with the loader not being able to query columns that had a different name from the entity propertyName

## [1.1.0]

### Added

* Support for querying fields from embedded entities

### Changed

* The `GraphQLQueryBuilder#info()` method to support using a path to fetch a nested field as entity root

## [1.0.0]

### Changed
* Initial full release
* Full refactor of codebase to a query-builder format. 
* Created a [documentation website](https://gql-loader.bmuller.net)

