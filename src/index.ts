import {Visitor} from "./visitor"
import {defaultParser} from "@odata/parser"
import {Token} from "@odata/parser/lib/lexer";

/**
 * Creates MongoDB collection, query, projection, sort, skip and limit from an OData URI string
 * @param {string} queryString - An OData query string
 * @return {Visitor} Visitor instance object with collection, query, projection, sort, skip and limit
 * @example
 * const query = createQuery("$filter=Size eq 4&$orderby=Orders&$skip=10&$top=5");
 * collections[query.collection].find(query.query).project(query.projection).sort(query.sort).skip(query.skip).limit(query.limit).toArray(function(err, data){ ... });
 */
export function createQuery(odataQuery: string);
export function createQuery(odataQuery: Token);
export function createQuery(odataQuery: string | Token) {
  if(odataQuery == "" || !odataQuery) odataQuery = null;
  let ast: Token = <Token>(typeof odataQuery == "string" ? defaultParser.query(<string>odataQuery) : odataQuery);
  return new Visitor().Visit(ast);
}
console.log('hii');
var x = 0;
var y = 0;
var z = 0;
/**
 * Creates a MongoDB query object from an OData filter expression string
 * @param {string} odataFilter - A filter expression in OData $filter format
 * @return {Object}  MongoDB query object
 * @example
 * const filter = createFilter("Size eq 4 and Age gt 18");
 * collection.find(filter, function(err, data){ ... });
 */
export function createFilter(odataFilter: string);
export function createFilter(odataFilter: Token);
export function createFilter(odataFilter: string | Token): Object {
  if(odataFilter == "" || !odataFilter) odataFilter = null;
  let context = {query: {}};
  let ast: Token = <Token>(typeof odataFilter == "string" ? defaultParser.filter(<string>odataFilter) : odataFilter);
  new Visitor().Visit(ast, context);
  return context.query;
}
