/*
 * Copyright (C) 2026 zhaodaniu <zhaodaniu1@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

#ifndef CCLASS_H
#define CCLASS_H

typedef struct {
  char* name;
  int age;
} Person;

void Person_constructor(Person* p);
void Person_destructor(Person* p);
void Person_move(Person* src, Person* dst);
void Person_copy(Person* src, Person* dst);

#endif
