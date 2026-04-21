"""Misc helper functions."""
import math


def paginate(query, page: int, per_page: int):
    """
    Apply pagination to a SQLAlchemy query.
    Returns (items, total, total_pages).
    """
    total = query.count()
    total_pages = math.ceil(total / per_page) if per_page > 0 else 0
    items = query.offset((page - 1) * per_page).limit(per_page).all()
    return items, total, total_pages
